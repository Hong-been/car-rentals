export interface Car {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Petrol' | 'Diesel' | 'Electric';
  available: boolean;
}

export interface Reservation {
  id: string;
  pickupDate: Date;
  returnDate: Date;
  car: Car;
  customerName: string;
  customerEmail: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  totalAmount: number;
  createdAt: Date;
}

export interface AdminStats {
  totalCars: number;
  availableCars: number;
  activeReservations: number;
  monthlyRevenue: number;
}