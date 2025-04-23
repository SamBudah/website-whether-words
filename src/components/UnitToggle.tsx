
import React from 'react';
import { Button } from "@/components/ui/button";

interface UnitToggleProps {
  unit: 'celsius' | 'fahrenheit';
  onToggle: () => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onToggle }) => {
  return (
    <div className="flex space-x-1 p-1 rounded-xl border border-gray-200 bg-white shadow-md min-w-[110px]">
      <Button
        variant={unit === 'celsius' ? 'default' : 'outline'}
        size="sm"
        className={`rounded-xl font-bold ${unit === 'celsius' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-blue-500 border-0 bg-transparent hover:text-blue-600'}`}
        onClick={unit === 'fahrenheit' ? onToggle : undefined}
        type="button"
      >
        °C
      </Button>
      <Button
        variant={unit === 'fahrenheit' ? 'default' : 'outline'}
        size="sm"
        className={`rounded-xl font-bold ${unit === 'fahrenheit' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-blue-500 border-0 bg-transparent hover:text-blue-600'}`}
        onClick={unit === 'celsius' ? onToggle : undefined}
        type="button"
      >
        °F
      </Button>
    </div>
  );
};

export default UnitToggle;
