import React, { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { Sidebar, Navbar } from './components/layout';
import { Dashboard } from './pages/Dashboard';
import { MedicinesManagement } from './pages/Medicines';
import { SalesBilling } from './pages/Sales';
import { Inventory } from './pages/Inventory';
import { Suppliers } from './pages/Suppliers';
import { Customers } from './pages/Customers';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { PurchasesManagement } from './pages/Purchases';
import { UserManagement } from './pages/UserManagement';
import { cn } from './components/UI';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'medicines': return <MedicinesManagement />;
      case 'purchases': return <PurchasesManagement />;
      case 'sales': return <SalesBilling />;
      case 'inventory': return <Inventory />;
      case 'suppliers': return <Suppliers />;
      case 'customers': return <Customers />;
      case 'users': return <UserManagement />;
      case 'reports': return <Reports />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-500 font-medium animate-pulse">Initializing PharmaCare...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Toaster position="top-right" richColors closeButton />
      
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
      />

      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        isCollapsed ? "ml-20" : "ml-64"
      )}>
        <Navbar activeTab={activeTab} />
        
        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
        
        <footer className="p-6 text-center text-gray-400 text-xs">
          <p>© 2024 PharmaCare Management Systems • Version 2.5.0 • All Rights Reserved</p>
        </footer>
      </div>
    </div>
  );
};

export default App;