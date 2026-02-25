import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye,
  ArrowUpDown,
  History,
  Scale,
  Settings2,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  X,
  Save
} from 'lucide-react';
import { Card, Button, Input, Badge, cn } from '../components/UI';
import { medicines, stockAdjustments } from '../data/mockData';
import { Medicine, StockAdjustment } from '../types';
import { toast } from 'sonner';

export const MedicinesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [adjustmentValue, setAdjustmentValue] = useState<number>(0);
  const [adjustmentReason, setAdjustmentReason] = useState('Correction');
  
  const filteredMedicines = medicines.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

    toast.success(`Stock for ${selectedMedicine.name} adjusted to ${newStock}`);
    setIsAdjusting(false);
    setSelectedMedicine(null);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Medicines Inventory</h1>
          <p className="text-sm text-slate-500">Manage your stock, prices, units, and medicine details.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2 rounded-xl">
            <History className="w-4 h-4" /> Adjustment Logs
          </Button>
          <Button className="flex items-center gap-2 rounded-xl shadow-lg shadow-blue-200">
            <Plus className="w-4 h-4" /> Add New Medicine
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden border-none shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-white flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input 
              placeholder="Search by name, category, or unit (e.g. mg)..." 
              className="pl-10 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2 rounded-lg">
              <Filter className="w-4 h-4" /> Filter
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2 rounded-lg">
              <ArrowUpDown className="w-4 h-4" /> Sort
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Medicine Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Unit / Dose</th>
                <th className="px-6 py-4">Batch No.</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMedicines.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{item.name}</div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1 uppercase">
                      Exp: {item.expiryDate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-600 px-2 py-1 bg-slate-100 rounded-lg">{item.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-blue-600">{item.unit}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono font-bold text-slate-500">{item.batchNumber}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-bold">
                    {item.stock} units
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      item.status === 'In Stock' ? 'success' : 
                      item.status === 'Low Stock' ? 'warning' : 'error'
                    }>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleAdjustStock(item)}>
                        <Scale className="w-4 h-4 text-amber-500" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-blue-500">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-rose-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {isAdjusting && selectedMedicine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6 border-none shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Adjust Stock</h3>
              <button onClick={() => setIsAdjusting(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-2xl">
                <p className="font-bold text-blue-900">{selectedMedicine.name}</p>
                <p className="text-xs text-blue-700">Current Stock: {selectedMedicine.stock} units</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Adjustment Value</label>
                  <Input 
                    type="number" 
                    className="text-center font-bold text-lg" 
                    value={adjustmentValue}
                    onChange={(e) => setAdjustmentValue(parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setIsAdjusting(false)}>Cancel</Button>
                <Button className="flex-1 rounded-xl shadow-lg shadow-blue-200" onClick={saveAdjustment}>Save</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};