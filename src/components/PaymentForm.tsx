import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Car } from '../types';
import { differenceInDays } from 'date-fns';
import toast from 'react-hot-toast';
import { CreditCard, Calendar, Car as CarIcon } from 'lucide-react';

interface PaymentFormProps {
  selectedCar: Car;
  pickupDate: Date;
  returnDate: Date;
  onSuccess: () => void;
}

export function PaymentForm({ selectedCar, pickupDate, returnDate, onSuccess }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const days = differenceInDays(returnDate, pickupDate) || 1;
  const totalAmount = selectedCar.price * days;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // In a real app, you would:
      // 1. Call your backend to create a Stripe payment intent
      // 2. Use Stripe.js to handle the payment
      // 3. Confirm the reservation on success
      
      // Simulating payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Payment successful! Your car is reserved.');
      onSuccess();
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6">Reservation Summary</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3">
          <CarIcon className="text-blue-600" />
          <div>
            <p className="font-medium">{selectedCar.name}</p>
            <p className="text-sm text-gray-600">{selectedCar.category}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="text-blue-600" />
          <div>
            <p className="font-medium">{days} day{days > 1 ? 's' : ''}</p>
            <p className="text-sm text-gray-600">
              {pickupDate.toLocaleDateString()} - {returnDate.toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <span>Daily Rate</span>
            <span>${selectedCar.price}/day</span>
          </div>
          <div className="flex justify-between items-center font-bold text-lg">
            <span>Total Amount</span>
            <span>${totalAmount}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Information
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Card number"
              className="w-full px-4 py-2 border rounded-lg"
              disabled={isProcessing}
            />
            <CreditCard className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="MM/YY"
            className="px-4 py-2 border rounded-lg"
            disabled={isProcessing}
          />
          <input
            type="text"
            placeholder="CVC"
            className="px-4 py-2 border rounded-lg"
            disabled={isProcessing}
          />
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
            isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isProcessing ? 'Processing...' : `Pay $${totalAmount}`}
        </button>
      </form>
    </div>
  );
}