import React from 'react';
import { LayoutDashboard, Car, Calendar, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'cars', icon: Car, label: 'Cars' },
    { id: 'reservations', icon: Calendar, label: 'Reservations' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg fixed left-0 top-0">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
      </div>
      <nav className="p-4">
        {menuItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              activeTab === id
                ? 'bg-purple-50 text-purple-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="absolute bottom-0 w-full p-4 border-t">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}