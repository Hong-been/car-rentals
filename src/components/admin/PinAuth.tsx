import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import toast from 'react-hot-toast';

interface PinAuthProps {
  onSuccess: () => void;
}

export function PinAuth({ onSuccess }: PinAuthProps) {
  const [pin, setPin] = useState('');
  const ADMIN_PIN = '1234';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      onSuccess();
      toast.success('Welcome, Admin!');
    } else {
      toast.error('Invalid PIN');
      setPin('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Access</h2>
          <p className="text-gray-600 mt-2">Enter PIN to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-center text-2xl tracking-widest"
              maxLength={4}
              pattern="[0-9]*"
              inputMode="numeric"
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            Access Admin Panel
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => window.history.back()}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}