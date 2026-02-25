import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  UserPlus,
  Shield, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  Mail,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  Users as UsersIcon
} from 'lucide-react';
import { Card, Button, Input, Badge, cn } from '../components/UI';
import { users } from '../data/mockData';
import { User, UserRole } from '../types';
import { toast } from 'sonner';

export const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
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

  const handleStatusToggle = (userName: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    toast.success(`${userName} is now ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-sm text-slate-500">Manage staff accounts, roles, and access permissions.</p>
        </div>
        <Button className="flex items-center gap-2 rounded-xl shadow-lg shadow-blue-200">
          <UserPlus className="w-4 h-4" /> Add New User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Staff', count: '12', icon: UsersIcon, color: 'text-blue-600' },
          { label: 'Administrators', count: '2', icon: ShieldAlert, color: 'text-rose-600' },
          { label: 'Pharmacists', count: '6', icon: UserCheck, color: 'text-emerald-600' },
          { label: 'Active Now', count: '4', icon: CheckCircle2, color: 'text-green-500' },
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
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2 rounded-lg">
              Filter Role
            </Button>
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
                        onClick={() => handleStatusToggle(user.name, user.status)}
                        className={cn("hover:bg-slate-100", user.status === 'Active' ? "text-amber-500" : "text-emerald-500")}
                      >
                        {user.status === 'Active' ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-blue-50 hover:text-blue-600">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-rose-50 hover:text-rose-600">
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
    </div>
  );
};