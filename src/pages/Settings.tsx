import React, { useState } from 'react';
import { 
  Building2, 
  User, 
  Lock, 
  Bell, 
  ShieldCheck, 
  Save,
  Camera,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  ToggleLeft as Toggle,
  CircleCheck,
  Circle
} from 'lucide-react';
import { Card, Button, Input, cn } from '../components/UI';
import { toast } from 'sonner';

type SettingsSection = 'pharmacy' | 'profile' | 'security' | 'notifications';

export const Settings = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('pharmacy');
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    toast.success('Settings updated successfully');
  };

  const navItems = [
    { id: 'pharmacy', label: 'Pharmacy Info', icon: Building2 },
    { id: 'profile', label: 'Personal Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
        <p className="text-slate-500">Manage your account preferences and organization profile.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 shrink-0">
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible no-scrollbar p-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as SettingsSection)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap",
                  activeSection === item.id 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                    : "text-slate-500 hover:bg-white hover:text-slate-900"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 space-y-6">
          {activeSection === 'pharmacy' && (
            <Card className="p-8 border-none shadow-sm">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Pharmacy Details</h3>
                  <p className="text-xs text-slate-500">Organization-wide information and contact details.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Pharmacy Name</label>
                  <Input defaultValue="PharmaCare Central" className="bg-slate-50 border-slate-200 focus:bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">License Number</label>
                  <Input defaultValue="LIC-2024-9988-X" className="bg-slate-50 border-slate-200 focus:bg-white" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Business Address</label>
                  <Input defaultValue="789 Health Boulevard, Medical District, City Center" className="bg-slate-50 border-slate-200 focus:bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Support Email</label>
                  <Input defaultValue="info@pharmacare.com" className="bg-slate-50 border-slate-200 focus:bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Phone Number</label>
                  <Input defaultValue="+1 (555) 000-1122" className="bg-slate-50 border-slate-200 focus:bg-white" />
                </div>
              </div>
              
              <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
                <Button onClick={handleSave} className="rounded-xl px-8">
                  Save Changes
                </Button>
              </div>
            </Card>
          )}

          {activeSection === 'profile' && (
            <Card className="p-8 border-none shadow-sm">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Personal Profile</h3>
                  <p className="text-xs text-slate-500">Update your personal information and profile picture.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="relative group">
                  <img 
                    src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/8806771f-b84f-4015-baaf-9dbb84498d2f/admin-avatar-5b948baf-1772000545457.webp" 
                    alt="Avatar" 
                    className="w-32 h-32 rounded-3xl object-cover ring-4 ring-white shadow-lg"
                  />
                  <button className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Full Name</label>
                    <Input defaultValue="Dr. Alex Rivera" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Job Title</label>
                    <Input defaultValue="Chief Administrator" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input defaultValue="alex@pharmacare.com" className="pl-10" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
                <Button onClick={handleSave} className="rounded-xl px-8">
                  Update Profile
                </Button>
              </div>
            </Card>
          )}

          {activeSection === 'security' && (
            <Card className="p-8 border-none shadow-sm">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Security Settings</h3>
                  <p className="text-xs text-slate-500">Protect your account with password and authentication.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-700">Change Password</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Current Password</label>
                      <div className="relative">
                        <Input type={showPassword ? "text" : "password"} />
                        <button 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">New Password</label>
                      <Input type="password" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-700">Two-Factor Authentication</h4>
                      <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-200">Enable</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-700">Active Sessions</h4>
                      <p className="text-xs text-slate-500">View and manage your currently active devices.</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-slate-500 underline">View Sessions</Button>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
                <Button onClick={handleSave} className="rounded-xl px-8">
                  Update Security
                </Button>
              </div>
            </Card>
          )}

          {activeSection === 'notifications' && (
            <Card className="p-8 border-none shadow-sm">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Notification Preferences</h3>
                  <p className="text-xs text-slate-500">Control how and when you receive alerts.</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Email Notifications</h4>
                  <div className="space-y-4">
                    {[
                      { title: 'New Sales Reports', desc: 'Daily summary of sales and revenue.', active: true },
                      { title: 'Inventory Alerts', desc: 'When stock levels reach low thresholds.', active: true },
                      { title: 'New User Registration', desc: 'Alert when a new staff member is added.', active: false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-700">{item.title}</p>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                        <button className={cn("transition-colors", item.active ? "text-blue-600" : "text-slate-300")}>
                          {item.active ? <CircleCheck className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">SMS / Push Notifications</h4>
                  <div className="space-y-4">
                    {[
                      { title: 'Critical Expiry Alerts', desc: 'Immediate alert for medicine expiry within 7 days.', active: true },
                      { title: 'System Downtime', desc: 'Maintenance and platform availability updates.', active: false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-700">{item.title}</p>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                        <button className={cn("transition-colors", item.active ? "text-blue-600" : "text-slate-300")}>
                          {item.active ? <CircleCheck className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
                <Button onClick={handleSave} className="rounded-xl px-8">
                  Save Preferences
                </Button>
              </div>
            </Card>
          )}

          <Card className="p-6 bg-blue-600 border-none shadow-lg shadow-blue-200 flex items-center justify-between text-white">
            <div className="flex gap-4 items-center">
              <div className="p-3 bg-white/10 rounded-2xl">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold">Pro Enterprise Plan</h4>
                <p className="text-xs text-blue-100 mt-0.5">Your organization has full access to all features.</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-blue-600 transition-all font-bold rounded-xl">
              View Plan
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};