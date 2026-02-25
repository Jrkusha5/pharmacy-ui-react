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
  XCircle
} from 'lucide-react';
import { Card, Button, Input, Badge } from '../components/UI';
import { purchases, medicines, suppliers } from '../data/mockData';
import { Purchase } from '../types';
import { toast } from 'sonner';

export const PurchasesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPurchases = purchases.filter(p => 
    p.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.batchNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Total Purchases', value: '128', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Monthly Spent', value: '$12,450', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Pending Orders', value: '3', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

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
          <Button className="flex items-center gap-2 rounded-xl shadow-lg shadow-blue-200">
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
                      <Button variant="ghost" size="icon" className="hover:bg-blue-50 hover:text-blue-600">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-slate-100 hover:text-slate-800">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-rose-50 hover:text-rose-600">
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
    </div>
  );
};