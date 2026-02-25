import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Eye, 
  Edit2, 
  Trash2, 
  Calendar,
  Package,
  TrendingUp,
  History,
  ArrowUpDown,
  MoreVertical,
  CheckCircle2,
  Clock,
  XCircle,
  X
} from 'lucide-react';
import { Card, Button, Input, Badge, cn } from '../components/UI';
import { purchases as initialPurchases, medicines, suppliers } from '../data/mockData';
import { Purchase } from '../types';
import { toast } from 'sonner';

export const PurchasesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [purchases, setPurchases] = useState<Purchase[]>(initialPurchases);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState<Purchase | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);

  const [formData, setFormData] = useState<Partial<Purchase>>({
    medicineId: '',
    medicineName: '',
    supplierId: '',
    supplierName: '',
    batchNumber: '',
    quantity: 0,
    purchasePrice: 0,
    sellingPrice: 0,
    purchaseDate: new Date().toISOString().split('T')[0],
    expiryDate: '',
    status: 'Completed'
  });
  
  const filteredPurchases = purchases.filter(p => 
    p.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.batchNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Total Purchases', value: purchases.length.toString(), icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Spent', value: `$${purchases.reduce((sum, p) => sum + (p.purchasePrice * p.quantity), 0).toLocaleString()}`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Pending Orders', value: purchases.filter(p => p.status === 'Pending').length.toString(), icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const handleOpenModal = (purchase: Purchase | null = null) => {
    if (purchase) {
      setEditingPurchase(purchase);
      setFormData(purchase);
    } else {
      setEditingPurchase(null);
      setFormData({
        medicineId: medicines[0]?.id || '',
        medicineName: medicines[0]?.name || '',
        supplierId: suppliers[0]?.id || '',
        supplierName: suppliers[0]?.name || '',
        batchNumber: '',
        quantity: 0,
        purchasePrice: 0,
        sellingPrice: 0,
        purchaseDate: new Date().toISOString().split('T')[0],
        expiryDate: '',
        status: 'Completed'
      });
    }
    setIsModalOpen(true);
  };

  const handleView = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
    setIsViewModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this purchase record?')) {
      setPurchases(prev => prev.filter(p => p.id !== id));
      toast.success('Purchase record deleted');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedMedicine = medicines.find(m => m.id === formData.medicineId);
    const selectedSupplier = suppliers.find(s => s.id === formData.supplierId);

    const dataToSave = {
      ...formData,
      medicineName: selectedMedicine?.name || formData.medicineName,
      supplierName: selectedSupplier?.name || formData.supplierName,
    };

    if (editingPurchase) {
      setPurchases(prev => prev.map(p => p.id === editingPurchase.id ? { ...p, ...dataToSave } as Purchase : p));
      toast.success('Purchase record updated');
    } else {
      const newPurchase: Purchase = {
        ...dataToSave as Purchase,
        id: `PUR-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      };
      setPurchases(prev => [newPurchase, ...prev]);
      toast.success('Purchase record added');
    }
    setIsModalOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed': return <Badge variant="success">Completed</Badge>;
      case 'Pending': return <Badge variant="warning">Pending</Badge>;
      case 'Cancelled': return <Badge variant="error">Cancelled</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Purchase Orders</h1>
          <p className="text-sm text-slate-500">Track and manage medicine procurement from suppliers.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2 rounded-xl">
            <History className="w-4 h-4" /> View History
          </Button>
          <Button onClick={() => handleOpenModal()} className="flex items-center gap-2 rounded-xl shadow-lg shadow-blue-200">
            <Plus className="w-4 h-4" /> New Purchase
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 border-none shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden border-none shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-white flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input 
              placeholder="Search by medicine, supplier or batch..." 
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
                <th className="px-6 py-4">Date & ID</th>
                <th className="px-6 py-4">Medicine / Supplier</th>
                <th className="px-6 py-4">Batch Details</th>
                <th className="px-6 py-4">Cost (Per Unit)</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPurchases.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{item.id}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {item.purchaseDate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-blue-600">{item.medicineName}</div>
                    <div className="text-xs text-slate-500">From: {item.supplierName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded w-fit">
                      {item.batchNumber}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 uppercase font-bold">Exp: {item.expiryDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">${item.purchasePrice.toFixed(2)}</div>
                    <div className="text-[10px] text-green-600 font-bold uppercase">Selling: ${item.sellingPrice.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-700">
                    {item.quantity} units
                  </td>
                  <td className="px-6 py-4 text-center">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="hover:bg-blue-50 hover:text-blue-600"
                        onClick={() => handleView(item)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="hover:bg-slate-100 hover:text-slate-800"
                        onClick={() => handleOpenModal(item)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="hover:bg-rose-50 hover:text-rose-600"
                        onClick={() => handleDelete(item.id)}
                      >
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <Card className="w-full max-w-2xl border-none shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
              <h3 className="text-lg font-bold text-slate-900">{editingPurchase ? 'Edit Purchase Order' : 'New Purchase Order'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Medicine</label>
                  <select 
                    className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.medicineId}
                    onChange={e => setFormData({ ...formData, medicineId: e.target.value })}
                    required
                  >
                    {medicines.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Supplier</label>
                  <select 
                    className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.supplierId}
                    onChange={e => setFormData({ ...formData, supplierId: e.target.value })}
                    required
                  >
                    {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Batch Number</label>
                  <Input required value={formData.batchNumber} onChange={e => setFormData({ ...formData, batchNumber: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Expiry Date</label>
                  <Input required type="date" value={formData.expiryDate} onChange={e => setFormData({ ...formData, expiryDate: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Quantity</label>
                  <Input required type="number" value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Purchase Price (Unit)</label>
                  <Input required type="number" step="0.01" value={formData.purchasePrice} onChange={e => setFormData({ ...formData, purchasePrice: parseFloat(e.target.value) || 0 })} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Selling Price (Unit)</label>
                  <Input required type="number" step="0.01" value={formData.sellingPrice} onChange={e => setFormData({ ...formData, sellingPrice: parseFloat(e.target.value) || 0 })} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Status</label>
                  <select 
                    className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                  >
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" className="flex-1 shadow-lg shadow-blue-200">{editingPurchase ? 'Update Record' : 'Create Record'}</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {isViewModalOpen && selectedPurchase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <Card className="w-full max-w-md border-none shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
              <h3 className="text-lg font-bold text-slate-900">Purchase Details</h3>
              <button onClick={() => setIsViewModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 bg-white space-y-6">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Order ID</p>
                <h4 className="text-xl font-black text-blue-900 font-mono">{selectedPurchase.id}</h4>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Medicine</p>
                  <p className="text-sm font-bold text-slate-800">{selectedPurchase.medicineName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Supplier</p>
                  <p className="text-sm font-bold text-slate-800">{selectedPurchase.supplierName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Batch Details</p>
                  <p className="text-sm font-bold text-slate-800 font-mono">{selectedPurchase.batchNumber}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Expiry Date</p>
                  <p className="text-sm font-bold text-slate-800">{selectedPurchase.expiryDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Quantity Purchased</p>
                  <p className="text-sm font-bold text-slate-800">{selectedPurchase.quantity} units</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Unit Cost</p>
                  <p className="text-sm font-bold text-slate-800">${selectedPurchase.purchasePrice.toFixed(2)}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Total Order Value</p>
                  <p className="text-2xl font-black text-slate-900">${(selectedPurchase.purchasePrice * selectedPurchase.quantity).toFixed(2)}</p>
                </div>
                {getStatusBadge(selectedPurchase.status)}
              </div>
              
              <Button onClick={() => setIsViewModalOpen(false)} className="w-full py-6">Close View</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};