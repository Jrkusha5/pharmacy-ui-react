import { Medicine, Sale, Supplier, Customer, Purchase, User, StockAdjustment } from '../types';

export const medicines: Medicine[] = [
  { id: '1', name: 'Amoxicillin', category: 'Antibiotics', batchNumber: 'AMX-2023-001', price: 12.50, stock: 150, expiryDate: '2025-06-15', status: 'In Stock', unit: '500mg' },
  { id: '2', name: 'Paracetamol', category: 'Analgesics', batchNumber: 'PCM-2023-042', price: 5.00, stock: 450, expiryDate: '2025-12-01', status: 'In Stock', unit: '500mg' },
  { id: '3', name: 'Ibuprofen', category: 'Anti-inflammatory', batchNumber: 'IBU-2023-112', price: 8.75, stock: 8, expiryDate: '2024-11-20', status: 'Low Stock', unit: '400mg' },
  { id: '4', name: 'Cetirizine Syrup', category: 'Antihistamine', batchNumber: 'CET-2023-089', price: 15.20, stock: 0, expiryDate: '2023-10-15', status: 'Expired', unit: '5mg/5ml' },
  { id: '5', name: 'Metformin', category: 'Antidiabetic', batchNumber: 'MET-2023-005', price: 10.00, stock: 200, expiryDate: '2026-01-10', status: 'In Stock', unit: '500mg' },
  { id: '6', name: 'Amlodipine', category: 'Antihypertensive', batchNumber: 'AML-2023-014', price: 18.30, stock: 15, expiryDate: '2025-03-22', status: 'Low Stock', unit: '5mg' },
  { id: '7', name: 'Omeprazole', category: 'Antacid', batchNumber: 'OME-2023-077', price: 22.00, stock: 80, expiryDate: '2025-08-05', status: 'In Stock', unit: '20mg' },
];

export const users: User[] = [
  { id: 'U-001', name: 'Dr. Alex Rivera', email: 'alex@pharmacare.com', role: 'Admin', status: 'Active', lastActive: '2024-03-20 10:30', avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/8806771f-b84f-4015-baaf-9dbb84498d2f/admin-avatar-5b948baf-1772000545457.webp' },
  { id: 'U-002', name: 'Sarah Connor', email: 'sarah@pharmacare.com', role: 'Pharmacist', status: 'Active', lastActive: '2024-03-20 09:15', avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/8806771f-b84f-4015-baaf-9dbb84498d2f/pharmacist-sarah-avatar-2aab5042-1772002152299.webp' },
  { id: 'U-003', name: 'John Matrix', email: 'john@pharmacare.com', role: 'Manager', status: 'Active', lastActive: '2024-03-19 16:45' },
  { id: 'U-004', name: 'Kyle Reese', email: 'kyle@pharmacare.com', role: 'Cashier', status: 'Inactive', lastActive: '2024-03-15 11:20', avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/8806771f-b84f-4015-baaf-9dbb84498d2f/cashier-kyle-avatar-fcf8f3ac-1772002152550.webp' },
];

export const purchases: Purchase[] = [
  { id: 'PUR-001', medicineId: '1', medicineName: 'Amoxicillin', supplierId: 'SUP-001', supplierName: 'PharmaCorp Solutions', batchNumber: 'AMX-2024-010', quantity: 100, purchasePrice: 8.50, sellingPrice: 12.50, purchaseDate: '2024-03-15', expiryDate: '2026-03-15', status: 'Completed' },
  { id: 'PUR-002', medicineId: '2', medicineName: 'Paracetamol', supplierId: 'SUP-001', supplierName: 'PharmaCorp Solutions', batchNumber: 'PCM-2024-055', quantity: 500, purchasePrice: 2.00, sellingPrice: 5.00, purchaseDate: '2024-03-18', expiryDate: '2027-03-18', status: 'Completed' },
];

export const stockAdjustments: StockAdjustment[] = [
  { id: 'ADJ-001', medicineId: '3', medicineName: 'Ibuprofen', previousStock: 10, newStock: 8, difference: -2, reason: 'Damaged packaging', date: '2024-03-19', performedBy: 'Dr. Alex Rivera' },
];

export const sales: Sale[] = [
  { id: 'S-1001', date: '2024-03-20', customerName: 'John Doe', totalAmount: 45.50, status: 'Paid', items: [] },
  { id: 'S-1002', date: '2024-03-20', customerName: 'Jane Smith', totalAmount: 12.50, status: 'Paid', items: [] },
  { id: 'S-1003', date: '2024-03-19', customerName: 'Walk-in Customer', totalAmount: 32.00, status: 'Paid', items: [] },
  { id: 'S-1004', date: '2024-03-19', customerName: 'Robert Wilson', totalAmount: 115.00, status: 'Pending', items: [] },
  { id: 'S-1005', date: '2024-03-18', customerName: 'Alice Brown', totalAmount: 25.75, status: 'Paid', items: [] },
];

export const suppliers: Supplier[] = [
  { id: 'SUP-001', name: 'PharmaCorp Solutions', contactPerson: 'Mark Stevens', email: 'mark@pharmacorp.com', phone: '+1 234-567-8901', address: '123 Medical Blvd, Health City', category: 'General' },
  { id: 'SUP-002', name: 'Global Bio-Tech', contactPerson: 'Sarah Jenkins', email: 'sarah@globalbio.com', phone: '+1 234-567-8902', address: '456 Biotech Way, Science Park', category: 'Vaccines' },
  { id: 'SUP-003', name: 'MediLife Supplies', contactPerson: 'David Chen', email: 'david@medilife.com', phone: '+1 234-567-8903', address: '789 Wellness St, Cure Town', category: 'Equipment' },
];

export const customers: Customer[] = [
  { id: 'C-001', name: 'John Doe', email: 'john.doe@example.com', phone: '+1 555-0101', lastPurchaseDate: '2024-03-20', totalSpent: 450.50 },
  { id: 'C-002', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1 555-0102', lastPurchaseDate: '2024-03-20', totalSpent: 125.00 },
  { id: 'C-003', name: 'Robert Wilson', email: 'robert.w@example.com', phone: '+1 555-0103', lastPurchaseDate: '2024-03-19', totalSpent: 890.25 },
];

export const chartData = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];