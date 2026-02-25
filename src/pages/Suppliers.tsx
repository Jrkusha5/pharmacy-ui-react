import React, { useState } from 'react';
import { 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  MoreHorizontal,
  Edit2,
  Trash2,
  Eye,
  X,
  Search
} from 'lucide-react';
import { Card, Button, Input, Badge, cn } from '../components/UI';
import { suppliers as initialSuppliers } from '../data/mockData';
import { Supplier } from '../types';
import { toast } from 'sonner';

export const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  
  const [formData, setFormData] = useState<Partial<Supplier>>({
    name: '',
    email: '',
    phone: '',
    address: '',
    contactPerson: '',
    category: 'General'
  });

  const filteredSuppliers = suppliers.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (supplier: Supplier | null = null) => {
    if (supplier) {
      setEditingSupplier(supplier);
      setFormData(supplier);
    } else {
      setEditingSupplier(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        contactPerson: '',
        category: 'General'
      });
    }
    setIsModalOpen(true);
  };

  const handleView = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsViewModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this supplier?')) {
      setSuppliers(prev => prev.filter(s => s.id !== id));
      toast.success('Supplier deleted successfully');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSupplier) {
      setSuppliers(prev => prev.map(s => s.id === editingSupplier.id ? { ...s, ...formData } as Supplier : s));
      toast.success('Supplier updated successfully');
    } else {
      const newSupplier: Supplier = {
        ...formData as Supplier,
        id: `SUP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      };
      setSuppliers(prev => [newSupplier, ...prev]);
      toast.success('Supplier added successfully');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Suppliers</h1>
          <p className="text-sm text-slate-500">Manage your medicine providers and contact info.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input 
              placeholder="Search suppliers..." 
              className="pl-10 h-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Supplier
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => (
          <Card key={supplier.id} className="p-6 group hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xl border-2 border-white shadow-sm">
                {supplier.name[0]}
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50" onClick={() => handleView(supplier)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:bg-slate-100" onClick={() => handleOpenModal(supplier)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600 hover:bg-rose-50" onClick={() => handleDelete(supplier.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-bold text-slate-800 text-lg">{supplier.name}</h3>
              <p className="text-xs text-slate-500 mb-4 font-medium uppercase tracking-wider">{supplier.category} Supplier</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400" />
                  {supplier.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Phone className="w-4 h-4 text-slate-400" />
                  {supplier.phone}
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                  <span className="flex-1 line-clamp-2 leading-relaxed">{supplier.address}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
              <div className="text-xs">
                <p className="text-slate-400 font-medium uppercase tracking-tighter">Contact Person</p>
                <p className="font-bold text-slate-700">{supplier.contactPerson}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleView(supplier)}>View Details</Button>
            </div>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <Card className="w-full max-w-lg border-none shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
              <h3 className="text-lg font-bold text-slate-900">{editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Supplier Name</label>
                  <Input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Contact Person</label>
                  <Input required value={formData.contactPerson} onChange={e => setFormData({ ...formData, contactPerson: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Category</label>
                  <Input required value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Email</label>
                  <Input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Phone</label>
                  <Input required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Address</label>
                  <textarea 
                    className="flex min-h-[80px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required 
                    value={formData.address} 
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" className="flex-1">{editingSupplier ? 'Save Changes' : 'Add Supplier'}</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {isViewModalOpen && selectedSupplier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <Card className="w-full max-w-md border-none shadow-2xl overflow-hidden">
             <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
              <h3 className="text-lg font-bold text-slate-900">Supplier Details</h3>
              <button onClick={() => setIsViewModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 bg-white space-y-6">
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-3xl mb-2 border-4 border-white shadow-md">
                  {selectedSupplier.name[0]}
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{selectedSupplier.name}</h2>
                <Badge variant="info">{selectedSupplier.category} Supplier</Badge>
              </div>
              
              <div className="grid grid-cols-1 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Contact Information</p>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-700 flex items-center gap-2"><Mail className="w-4 h-4 text-slate-400" /> {selectedSupplier.email}</p>
                    <p className="text-sm text-slate-700 flex items-center gap-2"><Phone className="w-4 h-4 text-slate-400" /> {selectedSupplier.phone}</p>
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Primary Contact</p>
                  <p className="text-sm text-slate-900 font-bold">{selectedSupplier.contactPerson}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Location</p>
                  <p className="text-sm text-slate-700 flex items-start gap-2"><MapPin className="w-4 h-4 text-slate-400 mt-0.5" /> {selectedSupplier.address}</p>
                </div>
              </div>

              <Button onClick={() => setIsViewModalOpen(false)} className="w-full py-6 mt-4">Close View</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};