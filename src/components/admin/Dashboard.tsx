import React from 'react';
import { Car, Calendar, DollarSign, Users } from 'lucide-react';
import { AdminStats } from '../../types';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: { value: number; label: 'up' | 'down' };
}

function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          {trend && (
            <p className={`text-sm mt-2 ${trend.label === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend.label === 'up' ? '↑' : '↓'} {trend.value}% from last month
            </p>
          )}
        </div>
        <div className="p-3 bg-purple-50 rounded-lg">
          {React.cloneElement(icon as React.ReactElement, { className: 'text-purple-600' })}
        </div>
      </div>
    </div>
  );
}

export function Dashboard({ stats }: { stats: AdminStats }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Cars"
          value={stats.totalCars.toString()}
          icon={<Car size={24} />}
        />
        <StatsCard
          title="Available Cars"
          value={stats.availableCars.toString()}
          icon={<Calendar size={24} />}
        />
        <StatsCard
          title="Active Reservations"
          value={stats.activeReservations.toString()}
          icon={<Users size={24} />}
        />
        <StatsCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue.toLocaleString()}`}
          icon={<DollarSign size={24} />}
          trend={{ value: 12.5, label: 'up' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Reservations</h3>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Popular Cars</h3>
        </div>
      </div>
    </div>
  );
}