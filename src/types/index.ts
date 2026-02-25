export type UserRole = 'Admin' | 'Manager' | 'Pharmacist' | 'Cashier';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status: 'Active' | 'Inactive';
  lastActive?: string;
}

export interface Medicine {
  id: string;
  name: string;
  category: string;
  batchNumber: string;
  price: number;
  stock: number;
  expiryDate: string;
  unit: string; // e.g., 'mg', 'ml', 'tablet', 'vial'
  status: 'In Stock' | 'Low Stock' | 'Expired';
}

export interface Purchase {
  id: string;
  medicineId: string;
  medicineName: string;
  supplierId: string;
  supplierName: string;
  batchNumber: string;
  quantity: number;
  purchasePrice: number;
  sellingPrice: number;
  purchaseDate: string;
  expiryDate: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
}

export interface StockAdjustment {
  id: string;
  medicineId: string;
  medicineName: string;
  previousStock: number;
  newStock: number;
  difference: number;
  reason: string; // e.g., 'Damage', 'Correction', 'Return'
  date: string;
  performedBy: string;
}

export interface Sale {
  id: string;
  date: string;
  customerName: string;
  totalAmount: number;
  status: 'Paid' | 'Pending';
  items: SaleItem[];
}

export interface SaleItem {
  medicineId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  category: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastPurchaseDate: string;
  totalSpent: number;
}