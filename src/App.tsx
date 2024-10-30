import React, { useState, useEffect } from 'react';
import { Car } from './types';
import { cars } from './data/cars';
import { CarCard } from './components/CarCard';
import { DatePicker } from './components/DatePicker';
import { PaymentForm } from './components/PaymentForm';
import { addDays } from 'date-fns';
import { Toaster } from 'react-hot-toast';
import { Car as CarIcon } from 'lucide-react';
import { Admin } from './pages/Admin';
import { PinAuth } from './components/admin/PinAuth';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [pickupDate, setPickupDate] = useState<Date>(new Date());
  const [returnDate, setReturnDate] = useState<Date>(addDays(new Date(), 3));
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        setShowAdminAuth(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleSuccess = () => {
    setSelectedCar(null);
    setShowPayment(false);
    setPickupDate(new Date());
    setReturnDate(addDays(new Date(), 3));
  };

  if (showAdminAuth) {
    return <PinAuth onSuccess={() => {
      setShowAdminAuth(false);
      setIsAdmin(true);
    }} />;
  }

  if (isAdmin) {
    return <Admin />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <CarIcon className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">Luxury Car Rentals</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showPayment ? (
          <>
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Select Your Dates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DatePicker
                  label="Pickup Date"
                  value={pickupDate}
                  onChange={setPickupDate}
                  minDate={new Date()}
                />
                <DatePicker
                  label="Return Date"
                  value={returnDate}
                  onChange={setReturnDate}
                  minDate={pickupDate}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onSelect={(car) => {
                    setSelectedCar(car);
                    setShowPayment(true);
                  }}
                  isSelected={car.id === selectedCar?.id}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-start pt-8">
            <PaymentForm
              selectedCar={selectedCar!}
              pickupDate={pickupDate}
              returnDate={returnDate}
              onSuccess={handleSuccess}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;