import React from 'react';
import { 
  Package, 
  AlertTriangle, 
  Calendar, 
  RefreshCcw,
  ArrowRight
} from 'lucide-react';
import { Card, Badge, Button } from '../components/UI';
import { medicines } from '../data/mockData';

export const Inventory = () => {
  const lowStock = medicines.filter(m => m.status === 'Low Stock');
  const expired = medicines.filter(m => m.status === 'Expired');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
          <p className="text-sm text-gray-500">Track stock levels, expiry dates, and warehouse status.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCcw className="w-4 h-4" /> Sync Inventory
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-0 border-amber-200 overflow-hidden">
          <div className="p-4 bg-amber-50 border-b border-amber-100 flex items-center justify-between">
            <h3 className="font-bold text-amber-800 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Low Stock Items
            </h3>
            <Badge variant="warning">{lowStock.length} Items</Badge>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {lowStock.map(m => (
                <div key={m.id} className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-100">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{m.name}</p>
                    <p className="text-xs text-gray-500">Batch: {m.batchNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-amber-600">{m.stock} left</p>
                    <button className="text-[10px] text-blue-600 font-medium hover:underline flex items-center gap-1">
                      Order More <ArrowRight className="w-2 h-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-0 border-red-200 overflow-hidden">
          <div className="p-4 bg-red-50 border-b border-red-100 flex items-center justify-between">
            <h3 className="font-bold text-red-800 flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Expired Items
            </h3>
            <Badge variant="error">{expired.length} Items</Badge>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {expired.map(m => (
                <div key={m.id} className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-100">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{m.name}</p>
                    <p className="text-xs text-red-500">Expired: {m.expiryDate}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">Remove</Button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-4 border-b border-gray-100 font-bold text-gray-800">
          Full Stock Inventory
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Medicine</th>
                <th className="px-6 py-4">Current Stock</th>
                <th className="px-6 py-4">Minimum Level</th>
                <th className="px-6 py-4">Last Restocked</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {medicines.map(m => (
                <tr key={m.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{m.name}</td>
                  <td className="px-6 py-4">{m.stock}</td>
                  <td className="px-6 py-4">20 units</td>
                  <td className="px-6 py-4 text-gray-500">2024-02-15</td>
                  <td className="px-6 py-4">
                    <Badge variant={m.stock > 20 ? 'success' : m.stock > 0 ? 'warning' : 'error'}>
                      {m.stock > 20 ? 'Healthy' : m.stock > 0 ? 'Low' : 'Out of Stock'}
                    </Badge>
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