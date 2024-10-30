import React, { useState } from 'react';
import { Car } from '../../types';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface CarManagementProps {
  cars: Car[];
  onAddCar: (car: Omit<Car, 'id'>) => void;
  onUpdateCar: (car: Car) => void;
  onDeleteCar: (id: string) => void;
}

export function CarManagement({ cars, onAddCar, onUpdateCar, onDeleteCar }: CarManagementProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  const CarForm = ({ car, onSubmit, onCancel }: any) => (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-xl shadow-sm">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={car?.name}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            defaultValue={car?.category}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price per Day</label>
          <input
            type="number"
            name="price"
            defaultValue={car?.price}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            name="image"
            defaultValue={car?.image}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
            required
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          {car ? 'Update Car' : 'Add Car'}
        </button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Car Management</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <Plus size={16} />
          Add New Car
        </button>
      </div>

      {(isAdding || editingCar) && (
        <CarForm
          car={editingCar}
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const carData = {
              name: formData.get('name') as string,
              category: formData.get('category') as string,
              price: Number(formData.get('price')),
              image: formData.get('image') as string,
              seats: 5,
              transmission: 'Automatic' as const,
              fuelType: 'Petrol' as const,
              available: true,
            };
            
            if (editingCar) {
              onUpdateCar({ ...carData, id: editingCar.id });
            } else {
              onAddCar(carData);
            }
            
            setIsAdding(false);
            setEditingCar(null);
          }}
          onCancel={() => {
            setIsAdding(false);
            setEditingCar(null);
          }}
        />
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Car</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price/Day</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cars.map((car) => (
              <tr key={car.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-10 w-10 rounded-lg object-cover" src={car.image} alt={car.name} />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{car.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${car.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    car.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {car.available ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setEditingCar(car)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDeleteCar(car.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}