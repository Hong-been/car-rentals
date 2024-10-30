import React from 'react';
import { Reservation } from '../../types';
import { format } from 'date-fns';

interface ReservationManagementProps {
  reservations: Reservation[];
  onUpdateStatus: (id: string, status: Reservation['status']) => void;
}

export function ReservationManagement({ reservations, onUpdateStatus }: ReservationManagementProps) {
  const getStatusColor = (status: Reservation['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Reservations</h2>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Car</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{reservation.customerName}</div>
                  <div className="text-sm text-gray-500">{reservation.customerEmail}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-lg object-cover"
                      src={reservation.car.image}
                      alt={reservation.car.name}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{reservation.car.name}</div>
                      <div className="text-sm text-gray-500">{reservation.car.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {format(reservation.pickupDate, 'MMM d, yyyy')}
                  </div>
                  <div className="text-sm text-gray-500">
                    to {format(reservation.returnDate, 'MMM d, yyyy')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${reservation.totalAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(reservation.status)}`}>
                    {reservation.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <select
                    value={reservation.status}
                    onChange={(e) => onUpdateStatus(reservation.id, e.target.value as Reservation['status'])}
                    className="rounded-lg border-gray-300 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}