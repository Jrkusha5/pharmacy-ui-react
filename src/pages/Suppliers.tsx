import React from 'react';
import { 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  MoreHorizontal 
} from 'lucide-react';
import { Card, Button, Badge } from '../components/UI';
import { suppliers } from '../data/mockData';

export const Suppliers = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Suppliers</h1>
          <p className="text-sm text-gray-500">Manage your medicine providers and contact info.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Supplier
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <Card key={supplier.id} className="p-6">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold">
                {supplier.name[0]}
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </Button>
            </div>
            
            <div className="mt-4">
              <h3 className="font-bold text-gray-800">{supplier.name}</h3>
              <p className="text-xs text-gray-500 mb-4">{supplier.category} Supplier</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {supplier.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {supplier.phone}
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="flex-1 line-clamp-2">{supplier.address}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
              <div className="text-xs">
                <p className="text-gray-400">Contact Person</p>
                <p className="font-semibold text-gray-700">{supplier.contactPerson}</p>
              </div>
              <Button variant="outline" size="sm">History</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};