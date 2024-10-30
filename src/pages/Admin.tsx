import React, { useState } from 'react';
import { Sidebar } from '../components/admin/Sidebar';
import { Dashboard } from '../components/admin/Dashboard';
import { CarManagement } from '../components/admin/CarManagement';
import { ReservationManagement } from '../components/admin/ReservationManagement';
import { cars as initialCars } from '../data/cars';
import { AdminStats, Car, Reservation } from '../types';

// Mock data for demonstration
const mockStats: AdminStats = {
  totalCars: initialCars.length,
  availableCars: initialCars.filter(car => car.available).length,
  activeReservations: 8,
  monthlyRevenue: 24650,
};

const mockReservations: Reservation[] = [
  {
    id: '1',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    car: initialCars[0],
    pickupDate: new Date('2024-03-15'),
    returnDate: new Date('2024-03-18'),
    status: 'active',
    totalAmount: 267,
    createdAt: new Date('2024-03-10'),
  },
  // Add more mock reservations as needed
];

export function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);

  const handleAddCar = (newCar: Omit<Car, 'id'>) => {
    const car: Car = {
      ...newCar,
      id: (cars.length + 1).toString(),
    };
    setCars([...cars, car]);
  };

  const handleUpdateCar = (updatedCar: Car) => {
    setCars(cars.map(car => car.id === updatedCar.id ? updatedCar : car));
  };

  const handleDeleteCar = (id: string) => {
    setCars(cars.filter(car => car.id !== id));
  };

  const handleUpdateReservationStatus = (id: string, status: Reservation['status']) => {
    setReservations(reservations.map(reservation =>
      reservation.id === id ? { ...reservation, status } : reservation
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="ml-64 p-8">
        {activeTab === 'dashboard' && <Dashboard stats={mockStats} />}
        {activeTab === 'cars' && (
          <CarManagement
            cars={cars}
            onAddCar={handleAddCar}
            onUpdateCar={handleUpdateCar}
            onDeleteCar={handleDeleteCar}
          />
        )}
        {activeTab === 'reservations' && (
          <ReservationManagement
            reservations={reservations}
            onUpdateStatus={handleUpdateReservationStatus}
          />
        )}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}