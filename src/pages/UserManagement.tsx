import React, { useState } from 'react';
import { 
  Search, 
  UserPlus,
  Shield, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  Mail,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  Users as UsersIcon,
  X
} from 'lucide-react';
import { Card, Button, Input, Badge, cn } from '../components/UI';
import { users as initialUsers } from '../data/mockData';
import { User, UserRole } from '../types';
import { toast } from 'sonner';

export const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    email: '',
    role: 'Cashier',
    status: 'Active'
  });

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'Admin': return <ShieldAlert className="w-4 h-4 text-rose-600" />;
      case 'Manager': return <ShieldCheck className="w-4 h-4 text-blue-600" />;
      case 'Pharmacist': return <UserCheck className="w-4 h-4 text-emerald-600" />;
      case 'Cashier': return <UsersIcon className="w-4 h-4 text-slate-600" />;
      default: return <Shield className="w-4 h-4 text-slate-400" />;
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'Admin': return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'Manager': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Pharmacist': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Cashier': return 'bg-slate-50 text-slate-700 border-slate-100';
      default: return 'bg-slate-50 text-slate-500';
    }
  };

  const handleStatusToggle = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const newStatus = u.status === 'Active' ? 'Inactive' : 'Active';
        toast.success(`${u.name} is now ${newStatus}`);
        return { ...u, status: newStatus as 'Active' | 'Inactive' };
      }
      return u;
    }));
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(u => u.id !== id));
      toast.success('User deleted successfully');
    }
  };

  const handleOpenModal = (user: User | null = null) => {
    if (user) {
      setEditingUser(user);
      setFormData(user);
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        role: 'Cashier',
        status: 'Active'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...formData } as User : u));
      toast.success('User updated successfully');
    } else {
      const newUser: User = {
        ...formData as User,
        id: `U-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        lastActive: 'Never'
      };
      setUsers(prev => [newUser, ...prev]);
      toast.success('User added successfully');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-sm text-slate-500">Manage staff accounts, roles, and access permissions.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2 rounded-xl shadow-lg shadow-blue-200">
          <UserPlus className="w-4 h-4" /> Add New User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Staff', count: users.length.toString(), icon: UsersIcon, color: 'text-blue-600' },
          { label: 'Administrators', count: users.filter(u => u.role === 'Admin').length.toString(), icon: ShieldAlert, color: 'text-rose-600' },
          { label: 'Pharmacists', count: users.filter(u => u.role === 'Pharmacist').length.toString(), icon: UserCheck, color: 'text-emerald-600' },
          { label: 'Active Staff', count: users.filter(u => u.status === 'Active').length.toString(), icon: CheckCircle2, color: 'text-green-500' },
        ].map((stat, i) => (
          <Card key={i} className="p-4 border-none shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-xl font-bold text-slate-900">{stat.count}</h3>
            </div>
            <stat.icon className={cn("w-8 h-8 opacity-20", stat.color)} />
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden border-none shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-white flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input 
              placeholder="Search users by name, email or role..." 
              className="pl-10 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">User Info</th>
                <th className="px-6 py-4 text-center">Role</th>
                <th className="px-6 py-4">Last Active</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden border-2 border-white shadow-sm">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-slate-400 font-bold text-sm">{user.name.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{user.name}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border",
                      getRoleColor(user.role as UserRole)
                    )}>
                      {getRoleIcon(user.role as UserRole)}
                      {user.role}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-600">{user.lastActive || 'Never'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={user.status === 'Active' ? 'success' : 'default'}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title={user.status === 'Active' ? 'Deactivate' : 'Activate'}
                        onClick={() => handleStatusToggle(user.id)}
                        className={cn("hover:bg-slate-100", user.status === 'Active' ? "text-amber-500" : "text-emerald-500")}
                      >
                        {user.status === 'Active' ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="hover:bg-blue-50 hover:text-blue-600"
                        onClick={() => handleOpenModal(user)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="hover:bg-rose-50 hover:text-rose-600"
                        onClick={() => handleDelete(user.id)}
                      >
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <Card className="w-full max-w-md border-none shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">{editingUser ? 'Edit User' : 'Add New User'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase">Full Name</label>
                <Input 
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase">Email Address</label>
                <Input 
                  required
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase">Role</label>
                <select 
                  className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value as UserRole })}
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Pharmacist">Pharmacist</option>
                  <option value="Cashier">Cashier</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase">Status</label>
                <select 
                  className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" className="flex-1">{editingUser ? 'Save Changes' : 'Add User'}</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};