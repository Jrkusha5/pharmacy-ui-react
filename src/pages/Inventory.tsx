import React, { useState } from 'react';
import { 
  Package, 
  AlertTriangle, 
  Calendar, 
  RefreshCcw,
  ArrowRight,
  Scale,
  X,
  Plus,
  ArrowUpDown,
  Search,
  Filter
} from 'lucide-react';
import { Card, Badge, Button, Input, cn } from '../components/UI';
import { medicines as initialMedicines } from '../data/mockData';
import { Medicine } from '../types';
import { toast } from 'sonner';

export const Inventory = () => {
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [adjustmentValue, setAdjustmentValue] = useState<number>(0);
  const [adjustmentReason, setAdjustmentReason] = useState('Correction');

  const lowStock = medicines.filter(m => m.status === 'Low Stock');
  const expired = medicines.filter(m => m.status === 'Expired');

  const handleAdjustStock = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setAdjustmentValue(0);
    setIsAdjusting(true);
  };

  const saveAdjustment = () => {
    if (!selectedMedicine) return;
    
    const newStock = selectedMedicine.stock + adjustmentValue;
    if (newStock < 0) {
      toast.error('Stock cannot be negative');
      return;
    }

    setMedicines(prev => prev.map(m => {
      if (m.id === selectedMedicine.id) {
        let newStatus: Medicine['status'] = 'In Stock';
        if (newStock === 0) newStatus = 'Expired';
        else if (newStock <= m.minStock) newStatus = 'Low Stock';
        return { ...m, stock: newStock, status: newStatus };
      }
      return m;
    }));

    toast.success(`Stock adjusted for ${selectedMedicine.name}`);
    setIsAdjusting(false);
    setSelectedMedicine(null);
  };

  const filteredStock = medicines.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.batchNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory & Stock Control</h1>
          <p className="text-sm text-slate-500">Real-time monitoring and stock level adjustments.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 rounded-xl">
            <RefreshCcw className="w-4 h-4" /> Sync Inventory
          </Button>
          <Button className="flex items-center gap-2 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
            <Plus className="w-4 h-4" /> Quick Add Stock
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-5 border-none shadow-sm flex items-center gap-4 bg-white">
          <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total SKUs</p>
            <h3 className="text-2xl font-black text-slate-900">{medicines.length}</h3>
          </div>
        </Card>

        <Card className="p-5 border-none shadow-sm flex items-center gap-4 bg-white">
          <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Low Stock Alerts</p>
            <h3 className="text-2xl font-black text-slate-900">{lowStock.length}</h3>
          </div>
        </Card>

        <Card className="p-5 border-none shadow-sm flex items-center gap-4 bg-white">
          <div className="p-3 bg-rose-50 rounded-2xl text-rose-600">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expired Items</p>
            <h3 className="text-2xl font-black text-slate-900">{expired.length}</h3>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-none shadow-sm overflow-hidden bg-white">
            <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
              <h3 className="font-black text-slate-800">Stock Inventory List</h3>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input 
                  placeholder="Search stock..." 
                  className="pl-10 h-10 bg-slate-50 border-none rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Medicine</th>
                    <th className="px-6 py-4 text-center">In Stock</th>
                    <th className="px-6 py-4 text-center">Min Level</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStock.map(m => (
                    <tr key={m.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">{m.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Batch: {m.batchNumber}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-black text-slate-700">{m.stock}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-bold text-slate-400">{m.minStock}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge variant={m.stock > m.minStock ? 'success' : m.stock > 0 ? 'warning' : 'error'}>
                          {m.stock > m.minStock ? 'Healthy' : m.stock > 0 ? 'Low' : 'Stock Out'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all"
                          onClick={() => handleAdjustStock(m)}
                        >
                          <Scale className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-0 border-none shadow-sm bg-white overflow-hidden">
            <div className="p-4 bg-amber-50 border-b border-amber-100 flex items-center justify-between">
              <h3 className="font-black text-amber-800 flex items-center gap-2 text-sm uppercase tracking-tight">
                <AlertTriangle className="w-4 h-4" /> Urgent Low Stock
              </h3>
              <Badge variant="warning">{lowStock.length}</Badge>
            </div>
            <div className="p-4 space-y-3">
              {lowStock.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">All stock levels are healthy.</p>
              ) : (
                lowStock.map(m => (
                  <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 group hover:border-amber-200 transition-all">
                    <div>
                      <p className="text-xs font-black text-slate-800">{m.name}</p>
                      <p className="text-[10px] text-slate-400">{m.stock} units remaining</p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 text-[10px] font-black uppercase text-blue-600 hover:bg-blue-100" onClick={() => handleAdjustStock(m)}>
                      Restock
                    </Button>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card className="p-0 border-none shadow-sm bg-white overflow-hidden">
            <div className="p-4 bg-rose-50 border-b border-rose-100 flex items-center justify-between">
              <h3 className="font-black text-rose-800 flex items-center gap-2 text-sm uppercase tracking-tight">
                <Calendar className="w-4 h-4" /> Expiry Monitoring
              </h3>
              <Badge variant="error">{expired.length}</Badge>
            </div>
            <div className="p-4 space-y-3">
              {expired.map(m => (
                <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <p className="text-xs font-black text-slate-800">{m.name}</p>
                    <p className="text-[10px] text-rose-500 font-bold uppercase">Expired: {m.expiryDate}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-rose-600 hover:bg-rose-100 p-1 rounded-lg">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {isAdjusting && selectedMedicine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <Card className="w-full max-w-md p-0 border-none shadow-2xl overflow-hidden bg-white">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">Stock Adjustment</h3>
              <button onClick={() => setIsAdjusting(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 space-y-8">
              <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-black text-blue-900">{selectedMedicine.name}</p>
                  <p className="text-xs font-bold text-blue-600/70 uppercase tracking-widest">Current Stock: {selectedMedicine.stock} units</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Adjustment Mode</label>
                  <div className="flex gap-2">
                    <Button 
                      variant={adjustmentValue >= 0 ? 'primary' : 'outline'}
                      className={cn("flex-1 rounded-xl h-10", adjustmentValue >= 0 ? "bg-emerald-600" : "")}
                      onClick={() => setAdjustmentValue(Math.abs(adjustmentValue))}
                    >
                      Add
                    </Button>
                    <Button 
                      variant={adjustmentValue < 0 ? 'danger' : 'outline'}
                      className="flex-1 rounded-xl h-10"
                      onClick={() => setAdjustmentValue(-Math.abs(adjustmentValue))}
                    >
                      Subtract
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity</label>
                  <Input 
                    type="number" 
                    className="h-10 text-center font-black text-lg rounded-xl bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                    value={Math.abs(adjustmentValue)}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      setAdjustmentValue(adjustmentValue < 0 ? -val : val);
                    }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reason for Adjustment</label>
                <select 
                  className="flex h-11 w-full rounded-xl border-none bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value)}
                >
                  <option value="Correction">Manual Count Correction</option>
                  <option value="Damage">Damaged / Broken Product</option>
                  <option value="Return">Return to Supplier</option>
                  <option value="Theft">Inventory Shrinkage (Theft)</option>
                </select>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Button className="w-full py-7 rounded-2xl font-black text-lg shadow-lg shadow-blue-200" onClick={saveAdjustment}>
                  Apply Adjustment
                </Button>
                <Button variant="ghost" className="w-full text-slate-400 font-bold" onClick={() => setIsAdjusting(false)}>
                  Cancel Action
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};