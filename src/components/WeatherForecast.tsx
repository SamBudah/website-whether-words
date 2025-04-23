
import React from 'react';
import WeatherIcon from './WeatherIcon';

interface ForecastItem {
  date: string;
  icon: string;
  temp_min: number;
  temp_max: number;
}

interface WeatherForecastProps {
  forecast: ForecastItem[];
  unit: 'celsius' | 'fahrenheit';
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast, unit }) => {
  const formatTemp = (temp: number): string => {
    const temperature = unit === 'fahrenheit' ? (temp * 9/5) + 32 : temp;
    return `${Math.round(temperature)}°`;
  };

  if (!forecast || forecast.length === 0) {
    // Placeholder for empty
    return (
      <div className="flex justify-between w-full items-center min-h-[48px] px-2 text-gray-400">
        <span>Day 1</span>
        <span>Day 2</span>
        <span>Day 3</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {forecast.map((item, index) => (
        <div key={index} className="flex flex-col items-center justify-center p-4">
          <p className="font-medium mb-2 text-gray-700">{item.date}</p>
          <div className="my-2">
            <WeatherIcon iconCode={item.icon} size={40} className="text-blue-600 mx-auto" />
          </div>
          <p className="mt-2 text-blue-800 font-bold text-xl">
            {formatTemp(item.temp_min)} - {formatTemp(item.temp_max)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
