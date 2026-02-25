import React from 'react';
import { 
  LayoutDashboard, 
  Pill, 
  ShoppingCart, 
  Box, 
  Users, 
  UserCircle, 
  BarChart3, 
  Settings, 
  LogOut,
  Search,
  Bell,
  ChevronRight,
  PackagePlus,
  ShieldCheck,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { cn, Input } from '../UI';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const Sidebar = ({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'medicines', label: 'Medicines', icon: Pill },
    { id: 'purchases', label: 'Purchases', icon: PackagePlus },
    { id: 'sales', label: 'Sales & Billing', icon: ShoppingCart },
    { id: 'inventory', label: 'Inventory', icon: Box },
    { id: 'suppliers', label: 'Suppliers', icon: Users },
    { id: 'customers', label: 'Customers', icon: UserCircle },
    { id: 'users', label: 'User Management', icon: ShieldCheck },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-slate-900 text-slate-300 transition-all duration-300 z-40 flex flex-col shadow-xl",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
            <Pill className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && <span className="text-white font-bold text-lg tracking-tight">PharmaCare</span>}
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-slate-400 hover:text-white transition-colors"
        >
          {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-1 mt-4 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative",
              activeTab === item.id 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40" 
                : "hover:bg-slate-800 hover:text-white"
            )}
          >
            <item.icon className={cn("w-5 h-5 transition-colors", activeTab === item.id ? "text-white" : "text-slate-400 group-hover:text-white")} />
            {!isCollapsed && <span className="font-medium whitespace-nowrap">{item.label}</span>}
            {!isCollapsed && activeTab === item.id && <ChevronRight className="ml-auto w-4 h-4 opacity-50" />}
            
            {isCollapsed && (
              <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-xl">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800/50">
        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all group">
          <LogOut className="w-5 h-5 group-hover:text-rose-400" />
          {!isCollapsed && <span className="font-medium group-hover:text-rose-400">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export const Navbar = ({ activeTab }: { activeTab: string }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200/60 px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold text-slate-800 capitalize">{activeTab.replace('-', ' ')}</h2>
      </div>

      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <Input 
            type="text" 
            placeholder="Search everything..." 
            className="w-full pl-10 pr-4 py-1.5 bg-slate-100/80 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 rounded-xl text-sm transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl relative transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800 leading-tight">Dr. Alex Rivera</p>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Administrator</p>
          </div>
          <div className="relative">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/8806771f-b84f-4015-baaf-9dbb84498d2f/admin-avatar-5b948baf-1772000545457.webp" 
              alt="User" 
              className="w-9 h-9 rounded-xl border-2 border-slate-100 shadow-sm object-cover"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
};