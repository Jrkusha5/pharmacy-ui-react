import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Pill, 
  ShoppingCart, 
  Package, 
  Users, 
  Truck, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  Menu,
  Bell,
  Search,
  User,
  Plus
} from 'lucide-react';
import { cn, Button } from '../components/UI';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

export const Sidebar = ({ activeTab, setActiveTab, collapsed, setCollapsed }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'medicines', label: 'Medicines', icon: Pill },
    { id: 'sales', label: 'Sales / Billing', icon: ShoppingCart },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'suppliers', label: 'Suppliers', icon: Truck },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-30 flex flex-col",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="p-4 flex items-center justify-between border-b border-gray-100 h-16">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Pill className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-gray-800 tracking-tight">PharmaCare</span>
          </div>
        )}
        {collapsed && (
          <div className="bg-blue-600 p-1.5 rounded-lg mx-auto">
            <Pill className="text-white w-5 h-5" />
          </div>
        )}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
              activeTab === item.id 
                ? "bg-blue-50 text-blue-600 font-medium" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <item.icon className={cn("w-5 h-5 min-w-[20px]", activeTab === item.id ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600")} />
            {!collapsed && <span>{item.label}</span>}
            {collapsed && (
              <div className="absolute left-14 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-all duration-200",
          collapsed && "justify-center"
        )}>
          <LogOut className="w-5 h-5 min-w-[20px]" />
          {!collapsed && <span>Logout</span>}
        </button>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:bg-gray-50"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
    </div>
  );
};

export const Navbar = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <header className={cn(
      "fixed top-0 right-0 h-16 bg-white border-b border-gray-200 transition-all duration-300 z-20 flex items-center justify-between px-6",
      collapsed ? "left-20" : "left-64"
    )}>
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-500" />
          <input 
            type="text" 
            placeholder="Search medicines, orders..." 
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-full">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>

        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition-colors">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-800 leading-tight">Dr. Alex Thompson</p>
            <p className="text-xs text-gray-500">Pharmacist Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            AT
          </div>
        </div>
      </div>
    </header>
  );
};