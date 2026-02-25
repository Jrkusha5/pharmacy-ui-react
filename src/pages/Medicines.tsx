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
  Save,
  Package
} from 'lucide-react';
import { Card, Button, Input, Badge, cn } from '../components/UI';
import { medicines as initialMedicines, stockAdjustments } from '../data/mockData';
import { Medicine, StockAdjustment } from '../types';
import { toast } from 'sonner';

export const MedicinesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [adjustmentValue, setAdjustmentValue] = useState<number>(0);
  const [adjustmentReason, setAdjustmentReason] = useState('Correction');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingMedicine, setViewingMedicine] = useState<Medicine | null>(null);

  const [formData, setFormData] = useState<Partial<Medicine>>({
    name: '',
    category: 'General',
    batchNumber: '',
    price: 0,
    stock: 0,
    minStock: 20,
    expiryDate: '',
    unit: '500mg',
    status: 'In Stock'
  });

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

    setMedicines(prev => prev.map(m => {
      if (m.id === selectedMedicine.id) {
        let newStatus: Medicine['status'] = 'In Stock';
        if (newStock === 0) newStatus = 'Expired'; // simplified for logic
        else if (newStock <= m.minStock) newStatus = 'Low Stock';
        return { ...m, stock: newStock, status: newStatus };
      }
      return m;
    }));

    toast.success(`Stock for ${selectedMedicine.name} adjusted to ${newStock}`);
    setIsAdjusting(false);
    setSelectedMedicine(null);
  };

  const handleOpenModal = (medicine: Medicine | null = null) => {
    if (medicine) {
      setEditingMedicine(medicine);
      setFormData(medicine);
    } else {
      setEditingMedicine(null);
      setFormData({
        name: '',
        category: 'General',
        batchNumber: '',
        price: 0,
        stock: 0,
        minStock: 20,
        expiryDate: '',
        unit: '500mg',
        status: 'In Stock'
      });
    }
    setIsModalOpen(true);
  };

  const handleView = (medicine: Medicine) => {
    setViewingMedicine(medicine);
    setIsViewModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this medicine?')) {
      setMedicines(prev => prev.filter(m => m.id !== id));
      toast.success('Medicine deleted from inventory');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentStock = formData.stock || 0;
    const minStock = formData.minStock || 20;
    let status: Medicine['status'] = 'In Stock';
    if (currentStock <= 0) status = 'Expired';
    else if (currentStock <= minStock) status = 'Low Stock';

    const dataToSave = { ...formData, status };

    if (editingMedicine) {
      setMedicines(prev => prev.map(m => m.id === editingMedicine.id ? { ...m, ...dataToSave } as Medicine : m));
      toast.success('Medicine details updated');
    } else {
      const newMedicine: Medicine = {
        ...dataToSave as Medicine,
        id: Math.random().toString(36).substr(2, 9),
      };
      setMedicines(prev => [newMedicine, ...prev]);
      toast.success('New medicine added to inventory');
    }
    setIsModalOpen(false);
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
          <Button onClick={() => handleOpenModal()} className="flex items-center gap-2 rounded-xl shadow-lg shadow-blue-200">
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
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Medicine Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Unit / Dose</th>
                <th className="px-6 py-4 text-center">Price</th>
                <th className="px-6 py-4 text-center">Stock</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMedicines.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{item.name}</div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1 uppercase font-bold">
                      Batch: {item.batchNumber} | Exp: {item.expiryDate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-600 px-2 py-1 bg-slate-100 rounded-lg">{item.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-blue-600">{item.unit}</span>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-slate-900">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-slate-600 font-bold">
                    {item.stock} units
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge variant={
                      item.status === 'In Stock' ? 'success' : 
                      item.status === 'Low Stock' ? 'warning' : 'error'
                    }>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleView(item)} className="text-slate-500">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleAdjustStock(item)} title="Adjust Stock">
                        <Scale className="w-4 h-4 text-amber-500" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-blue-500" onClick={() => handleOpenModal(item)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-rose-500" onClick={() => handleDelete(item.id)}>
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
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="font-bold text-blue-900">{selectedMedicine.name}</p>
                <p className="text-xs text-blue-700">Current Stock: {selectedMedicine.stock} units</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Adjustment Value (+ / -)</label>
                  <Input 
                    type="number" 
                    className="text-center font-bold text-lg h-12" 
                    value={adjustmentValue}
                    onChange={(e) => setAdjustmentValue(parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Reason for Adjustment</label>
                  <select 
                    className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={adjustmentReason}
                    onChange={(e) => setAdjustmentReason(e.target.value)}
                  >
                    <option value="Correction">Manual Correction</option>
                    <option value="Damage">Damaged Stock</option>
                    <option value="Return">Supplier Return</option>
                    <option value="Expired">Expired Stock Removal</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 py-6" onClick={() => setIsAdjusting(false)}>Cancel</Button>
                <Button className="flex-1 py-6 shadow-lg shadow-blue-200" onClick={saveAdjustment}>Update Stock</Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <Card className="w-full max-w-2xl border-none shadow-2xl overflow-hidden">
             <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
              <h3 className="text-lg font-bold text-slate-900">{editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Medicine Name</label>
                  <Input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Paracetamol" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Category</label>
                  <Input required value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} placeholder="e.g. Analgesic" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Unit / Dose</label>
                  <Input required value={formData.unit} onChange={e => setFormData({ ...formData, unit: e.target.value })} placeholder="e.g. 500mg, 10ml, etc" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Batch Number</label>
                  <Input required value={formData.batchNumber} onChange={e => setFormData({ ...formData, batchNumber: e.target.value })} placeholder="BATCH-001" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Expiry Date</label>
                  <Input required type="date" value={formData.expiryDate} onChange={e => setFormData({ ...formData, expiryDate: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Price (Selling)</label>
                  <Input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Initial Stock</label>
                  <Input required type="number" value={formData.stock} onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Min. Stock Alert Level</label>
                  <Input required type="number" value={formData.minStock} onChange={e => setFormData({ ...formData, minStock: parseInt(e.target.value) || 0 })} />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" className="flex-1 shadow-lg shadow-blue-200">{editingMedicine ? 'Update Medicine' : 'Add Medicine'}</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {isViewModalOpen && viewingMedicine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <Card className="w-full max-w-md border-none shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
              <h3 className="text-lg font-bold text-slate-900">Medicine Information</h3>
              <button onClick={() => setIsViewModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 bg-white space-y-6">
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 border-4 border-white shadow-md">
                  <Package className="w-10 h-10" />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-black text-slate-900">{viewingMedicine.name}</h2>
                  <Badge variant="success">{viewingMedicine.category}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Batch Number</p>
                  <p className="text-sm font-bold text-slate-800 font-mono">{viewingMedicine.batchNumber}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Unit Dose</p>
                  <p className="text-sm font-bold text-blue-600">{viewingMedicine.unit}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Stock</p>
                  <p className="text-lg font-black text-slate-900">{viewingMedicine.stock} <span className="text-xs font-normal text-slate-500">Units</span></p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Selling Price</p>
                  <p className="text-lg font-black text-emerald-600">${viewingMedicine.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Expiration Date</p>
                <p className="text-base font-bold text-rose-600 text-center bg-rose-50 py-2 rounded-xl border border-rose-100">{viewingMedicine.expiryDate}</p>
              </div>

              <Button onClick={() => setIsViewModalOpen(false)} className="w-full py-6">Close Information</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};