
import React from 'react';
import WeatherIcon from './WeatherIcon';

interface CurrentWeatherProps {
  data: {
    city: string;
    country: string;
    date: string;
    temp: number;
    feels_like: number;
    description: string;
    icon: string;
  };
  unit: 'celsius' | 'fahrenheit';
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, unit }) => {
  const formatTemp = (temp: number): string => {
    const temperature = unit === 'fahrenheit' ? (temp * 9/5) + 32 : temp;
    return `${Math.round(temperature)}°`;
  };

  return (
    <div className="flex flex-row items-center justify-between min-h-[128px]">
      {/* Left */}
      <div className="flex flex-col gap-2">
        <div className="text-3xl font-extrabold text-gray-800">{data.city}, {data.country}</div>
        <div className="text-base text-gray-500">{data.date}</div>
        <div className="text-md text-gray-600 mt-2 capitalize">{data.description}</div>
      </div>
      {/* Right */}
      <div className="flex flex-col items-end gap-2">
        <WeatherIcon iconCode={data.icon} size={48} className="text-blue-600" />
        <div className="flex items-center text-gray-700 font-bold text-3xl">
          <span className="mr-1">{formatTemp(data.temp)}</span>
        </div>
        <div className="text-right text-gray-500 text-xs mt-1">
          Feels like: {formatTemp(data.feels_like)}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
