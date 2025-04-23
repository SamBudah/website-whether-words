
import React from 'react';
import { Button } from "@/components/ui/button";

interface UnitToggleProps {
  unit: 'celsius' | 'fahrenheit';
  onToggle: () => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onToggle }) => {
  return (
    <div className="flex space-x-2">
      <Button
        variant={unit === 'celsius' ? 'default' : 'outline'}
        size="sm"
        onClick={unit === 'fahrenheit' ? onToggle : undefined}
      >
        °C
      </Button>
      <Button
        variant={unit === 'fahrenheit' ? 'default' : 'outline'}
        size="sm"
        onClick={unit === 'celsius' ? onToggle : undefined}
      >
        °F
      </Button>
    </div>
  );
};

export default UnitToggle;
