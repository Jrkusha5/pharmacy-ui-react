import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  Trash2, 
  Search, 
  Printer, 
  CreditCard, 
  UserPlus,
  ShoppingCart,
  Receipt
} from 'lucide-react';
import { Card, Button, Input, Badge, cn } from '../components/UI';
import { medicines } from '../data/mockData';
import { Medicine, SaleItem } from '../types';
import { toast } from 'sonner';

export const SalesBilling = () => {
  const [cart, setCart] = useState<SaleItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customerName, setCustomerName] = useState('Walk-in Customer');

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

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    toast.success('Sale completed successfully!');
    setCart([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-4 bg-blue-600 border-none">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" /> New Sale Transaction
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-blue-100 text-sm">Invoice #INV-2024-001</span>
              <Badge variant="success">Active Session</Badge>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px]">
          <Card className="flex flex-col">
            <div className="p-4 border-b border-gray-100 flex flex-col gap-3">
              <h3 className="font-bold text-gray-800">Select Medicines</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search inventory..." 
                  className="pl-10 h-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {filteredMedicines.map((m) => (
                <div 
                  key={m.id} 
                  className="p-3 border border-gray-100 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 cursor-pointer transition-all group"
                  onClick={() => addToCart(m)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">{m.name}</h4>
                      <p className="text-xs text-gray-500">{m.category}</p>
                    </div>
                    <p className="font-bold text-blue-600 text-sm">${m.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className={cn(
                      "text-[10px] font-medium px-2 py-0.5 rounded",
                      m.stock > 20 ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                    )}>
                      {m.stock} in stock
                    </span>
                    <Button size="sm" variant="outline" className="h-7 text-[10px] py-0 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="flex flex-col">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">Current Order</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <Receipt className="w-12 h-12 mb-2 opacity-20" />
                  <p className="text-sm">No items in cart</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.medicineId} className="flex items-center justify-between gap-2 border-b border-gray-50 pb-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateQuantity(item.medicineId, -1)}
                        className="p-1 rounded-md hover:bg-gray-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.medicineId, 1)}
                        className="p-1 rounded-md hover:bg-gray-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-right min-w-[60px]">
                      <p className="text-sm font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                      <button 
                        onClick={() => removeFromCart(item.medicineId)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
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
        <Card className="p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-blue-600" />
            Customer Details
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Search Customer</label>
              <Input 
                placeholder="Name or Phone" 
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-xs text-gray-500">Selected Customer</p>
              <p className="text-sm font-bold text-gray-800">{customerName}</p>
              <p className="text-[10px] text-gray-400 mt-1">Previous balance: $0.00</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-blue-600" />
            Order Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tax (5%)</span>
              <span className="font-medium text-gray-800">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Discount</span>
              <span className="font-medium text-emerald-600">-$0.00</span>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
              <span className="font-bold text-gray-800">Total Payable</span>
              <span className="text-2xl font-black text-blue-600">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <Button className="w-full py-6 flex items-center justify-center gap-2" size="lg" onClick={handleCheckout}>
              <CreditCard className="w-5 h-5" /> Pay & Generate Invoice
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <Printer className="w-4 h-4" /> Print Quotation
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};