import React from 'react';
import { Car } from '../types';
import { Users, Fuel, Gauge } from 'lucide-react';

interface CarCardProps {
  car: Car;
  onSelect: (car: Car) => void;
  isSelected: boolean;
}

export function CarCard({ car, onSelect, isSelected }: CarCardProps) {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
        isSelected
          ? 'ring-2 ring-purple-500 transform scale-[1.02]'
          : 'hover:shadow-xl hover:transform hover:scale-[1.01]'
      }`}
    >
      <img
        src={car.image}
        alt={car.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
            <p className="text-sm text-gray-600">{car.category}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-purple-600">${car.price}</p>
            <p className="text-sm text-gray-600">per day</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-gray-600" />
            <span className="text-sm text-gray-600">{car.seats} Seats</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge size={18} className="text-gray-600" />
            <span className="text-sm text-gray-600">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel size={18} className="text-gray-600" />
            <span className="text-sm text-gray-600">{car.fuelType}</span>
          </div>
        </div>

        <button
          onClick={() => onSelect(car)}
          disabled={!car.available}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
            car.available
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {car.available ? 'Select Vehicle' : 'Not Available'}
        </button>
      </div>
    </div>
  );
}