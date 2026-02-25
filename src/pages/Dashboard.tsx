import React from 'react';
import { 
  Pill, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, Badge, cn } from '../components/UI';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { chartData, medicines, sales } from '../data/mockData';

export const Dashboard = () => {
  const stats = [
    { title: 'Total Medicines', value: medicines.length, icon: Pill, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+5%', up: true },
    { title: 'Low Stock', value: medicines.filter(m => m.status === 'Low Stock').length, icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', trend: '-2', up: false },
    { title: 'Expired', value: medicines.filter(m => m.status === 'Expired').length, icon: Clock, color: 'text-red-600', bg: 'bg-red-50', trend: '0', up: true },
    { title: "Today's Sales", value: '$1,245.00', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+12%', up: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-sm text-gray-500">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="info">System Online</Badge>
          <span className="text-xs text-gray-400 mt-1">Last synced: 2 mins ago</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-start justify-between">
              <div className={cn("p-3 rounded-xl", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div className={cn("flex items-center text-xs font-medium", stat.up ? "text-emerald-600" : "text-red-600")}>
                {stat.trend}
                {stat.up ? <ArrowUpRight className="w-3 h-3 ml-1" /> : <ArrowDownRight className="w-3 h-3 ml-1" />}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Revenue Trends
            </h3>
            <select className="text-sm border-none bg-gray-50 rounded-lg p-1 px-2 focus:ring-0 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-gray-800 mb-6">Recent Sales</h3>
          <div className="space-y-4">
            {sales.slice(0, 5).map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                    {sale.customerName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{sale.customerName}</p>
                    <p className="text-xs text-gray-500">{sale.id} • {sale.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800">${sale.totalAmount.toFixed(2)}</p>
                  <Badge variant={sale.status === 'Paid' ? 'success' : 'warning'}>{sale.status}</Badge>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 text-sm text-blue-600 font-medium hover:underline">View All Transactions</button>
        </Card>
      </div>
    </div>
  );
};