import React from 'react';
import { format } from 'date-fns';

interface DatePickerProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
}

export function DatePicker({ label, value, onChange, minDate }: DatePickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type="datetime-local"
        value={format(value, "yyyy-MM-dd'T'HH:mm")}
        min={minDate ? format(minDate, "yyyy-MM-dd'T'HH:mm") : undefined}
        onChange={(e) => onChange(new Date(e.target.value))}
        className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
}