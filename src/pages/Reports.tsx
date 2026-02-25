import React from 'react';
import { 
  BarChart3, 
  Download, 
  TrendingUp, 
  Calendar,
  FileText
} from 'lucide-react';
import { Card, Button, Badge } from '../components/UI';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { chartData } from '../data/mockData';

export const Reports = () => {
  const categoryData = [
    { name: 'Antibiotics', value: 2500 },
    { name: 'Analgesics', value: 1800 },
    { name: 'Antidiabetic', value: 3200 },
    { name: 'Antacids', value: 1200 },
    { name: 'Vitamins', value: 900 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sales & Analytics Reports</h1>
          <p className="text-sm text-gray-500">Visual insight into your pharmacy's performance.</p>
        </div>
        <Button className="flex items-center gap-2" variant="outline">
          <Download className="w-4 h-4" /> Export PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-none">
          <p className="text-blue-100 text-sm">Monthly Revenue</p>
          <h3 className="text-3xl font-bold mt-1">$45,280.00</h3>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="bg-blue-500/30 px-2 py-0.5 rounded text-white">+15% from last month</span>
          </div>
        </Card>
        
        <Card className="p-6">
          <p className="text-gray-500 text-sm">Avg. Daily Sales</p>
          <h3 className="text-3xl font-bold mt-1 text-gray-800">$1,510.00</h3>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Badge variant="success">+4% since Monday</Badge>
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-gray-500 text-sm">Customer Retention</p>
          <h3 className="text-3xl font-bold mt-1 text-gray-800">82%</h3>
          <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600 font-medium">
            <TrendingUp className="w-4 h-4" /> High performance
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Revenue by Category
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '12px', border: 'none'}} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Recent Reports
          </h3>
          <div className="space-y-4">
            {[
              { title: 'Monthly Sales Summary', date: 'March 1, 2024', size: '2.4 MB' },
              { title: 'Inventory Valuation', date: 'Feb 28, 2024', size: '1.8 MB' },
              { title: 'Supplier Performance', date: 'Feb 25, 2024', size: '3.1 MB' },
              { title: 'Customer Feedback Survey', date: 'Feb 20, 2024', size: '0.5 MB' },
            ].map((rep, i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{rep.title}</p>
                    <p className="text-xs text-gray-500">{rep.date} • {rep.size}</p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};