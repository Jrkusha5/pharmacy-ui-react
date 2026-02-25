import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Minus, 
  Trash2, 
  Search, 
  Printer, 
  CreditCard, 
  UserPlus,
  ShoppingCart,
  Receipt,
  Camera,
  Upload,
  X,
  FileText
} from 'lucide-react';
import { Card, Button, Input, Badge, cn } from '../components/UI';
import { medicines } from '../data/mockData';
import { Medicine, SaleItem } from '../types';
import { toast } from 'sonner';

export const SalesBilling = () => {
  const [cart, setCart] = useState<SaleItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customerName, setCustomerName] = useState('Walk-in Customer');
  const [customerAge, setCustomerAge] = useState<string>('');
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [prescriptionPreview, setPrescriptionPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addToCart = (medicine: Medicine) => {
    if (medicine.stock === 0) {
      toast.error('Medicine out of stock');
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.medicineId === medicine.id);
      if (existing) {
        return prev.map(item => 
          item.medicineId === medicine.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { 
        medicineId: medicine.id, 
        name: medicine.name, 
        price: medicine.price, 
        quantity: 1 
      }];
    });
    toast.success(`${medicine.name} added to cart`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.medicineId === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.medicineId !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const filteredMedicines = medicines.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) && m.status !== 'Expired'
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPrescriptionFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPrescriptionPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      toast.success('Prescription uploaded successfully');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    if (customerName === 'Walk-in Customer' && !customerAge) {
      toast.warning('Consider adding customer age for records');
    }
    
    toast.success('Sale completed successfully!');
    setCart([]);
    setCustomerName('Walk-in Customer');
    setCustomerAge('');
    setPrescriptionFile(null);
    setPrescriptionPreview(null);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-4 bg-blue-600 border-none shadow-xl shadow-blue-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-black text-white flex items-center gap-3 tracking-tight">
              <div className="bg-white/20 p-2 rounded-xl">
                <ShoppingCart className="w-6 h-6" />
              </div>
              New Sale Transaction
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-blue-100 text-xs font-bold font-mono tracking-widest">#INV-2024-001</span>
              <Badge variant="success" className="bg-green-400 text-blue-900 border-none">Active Session</Badge>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[650px]">
          <Card className="flex flex-col border-none shadow-sm">
            <div className="p-5 border-b border-slate-100 flex flex-col gap-4 bg-white rounded-t-xl">
              <h3 className="font-black text-slate-800 flex items-center gap-2">
                <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                Select Medicines
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input 
                  placeholder="Search inventory..." 
                  className="pl-10 h-11 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30">
              {filteredMedicines.map((m) => (
                <div 
                  key={m.id} 
                  className="p-3 bg-white border border-slate-100 rounded-2xl hover:border-blue-400 hover:shadow-lg hover:shadow-blue-50 cursor-pointer transition-all group"
                  onClick={() => addToCart(m)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600">{m.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m.category} • {m.unit}</p>
                    </div>
                    <p className="font-black text-blue-600 text-sm">${m.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className={cn(
                      "text-[10px] font-black px-2 py-0.5 rounded-full uppercase",
                      m.stock > 20 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    )}>
                      {m.stock} in stock
                    </span>
                    <Button size="sm" variant="ghost" className="h-8 text-[10px] px-4 font-black rounded-lg bg-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="flex flex-col border-none shadow-sm">
            <div className="p-5 border-b border-slate-100 bg-white rounded-t-xl">
              <h3 className="font-black text-slate-800 flex items-center gap-2">
                <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                Current Order
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/30">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4 opacity-30">
                  <Receipt className="w-20 h-20" />
                  <p className="text-sm font-black uppercase tracking-widest">Empty Cart</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.medicineId} className="flex items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex-1">
                      <p className="text-sm font-black text-slate-800">{item.name}</p>
                      <p className="text-xs font-bold text-blue-600">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-xl">
                      <button 
                        onClick={(e) => { e.stopPropagation(); updateQuantity(item.medicineId, -1); }}
                        className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm text-slate-500"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-black w-6 text-center text-slate-700">{item.quantity}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); updateQuantity(item.medicineId, 1); }}
                        className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm text-slate-500"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-right min-w-[70px] flex flex-col items-end gap-1">
                      <p className="text-sm font-black text-slate-900 font-mono">${(item.price * item.quantity).toFixed(2)}</p>
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeFromCart(item.medicineId); }}
                        className="text-rose-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <Card className="p-6 border-none shadow-sm">
          <h3 className="font-black text-slate-800 mb-6 flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
              <UserPlus className="w-5 h-5" />
            </div>
            Customer Information
          </h3>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Name</label>
              <Input 
                placeholder="e.g. John Smith" 
                className="h-11 rounded-xl bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-blue-100 font-bold"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Age</label>
              <Input 
                type="number"
                placeholder="e.g. 35" 
                className="h-11 rounded-xl bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-blue-100 font-bold"
                value={customerAge}
                onChange={(e) => setCustomerAge(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prescription</label>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 h-12 rounded-xl border-dashed border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 flex items-center gap-2 group transition-all"
                  onClick={triggerFileUpload}
                >
                  <Camera className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                  <span className="text-xs font-black text-slate-500 group-hover:text-blue-900">Capture / Upload</span>
                </Button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                />
              </div>
              
              {prescriptionPreview && (
                <div className="mt-4 relative group">
                  <div className="w-full h-32 rounded-2xl overflow-hidden border-2 border-slate-100">
                    <img src={prescriptionPreview} alt="Prescription" className="w-full h-full object-cover" />
                  </div>
                  <button 
                    onClick={() => { setPrescriptionFile(null); setPrescriptionPreview(null); }}
                    className="absolute -top-2 -right-2 bg-rose-500 text-white p-1 rounded-full shadow-lg"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-sm">
          <h3 className="font-black text-slate-800 mb-8 flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
              <Receipt className="w-5 h-5" />
            </div>
            Order Summary
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-bold uppercase tracking-tighter">Subtotal</span>
              <span className="font-black text-slate-800 font-mono">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-bold uppercase tracking-tighter">Tax (5%)</span>
              <span className="font-black text-slate-800 font-mono">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-bold uppercase tracking-tighter">Discount</span>
              <span className="font-black text-emerald-600 font-mono">-$0.00</span>
            </div>
            <div className="pt-6 border-t border-slate-100 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="font-black text-slate-900 uppercase tracking-widest text-xs">Total Payable</span>
                <span className="text-3xl font-black text-blue-600 font-mono tracking-tighter">${total.toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold italic text-right">* Inclusive of all taxes</p>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <Button className="w-full py-7 flex items-center justify-center gap-3 rounded-2xl text-lg font-black shadow-lg shadow-blue-200" size="lg" onClick={handleCheckout}>
              <CreditCard className="w-6 h-6" /> Pay & Checkout
            </Button>
            <Button variant="outline" className="w-full py-5 flex items-center justify-center gap-2 rounded-2xl font-black text-slate-600 border-2">
              <Printer className="w-4 h-4" /> Print Invoice Draft
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};