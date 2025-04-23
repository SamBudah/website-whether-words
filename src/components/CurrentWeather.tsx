
import React from 'react';
import WeatherIcon from './WeatherIcon';
import { Card, CardContent } from "@/components/ui/card";

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
    return `${Math.round(temperature)}°${unit === 'celsius' ? 'C' : 'F'}`;
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
        <div className="flex flex-col items-center">
          <WeatherIcon iconCode={data.icon} size={80} className="text-primary" />
          <h2 className="text-4xl font-bold mt-2">{formatTemp(data.temp)}</h2>
          <p className="text-xl font-medium capitalize">{data.description}</p>
        </div>
        <div className="text-center mt-4">
          <p className="text-lg">{data.date}</p>
          <p className="text-lg font-medium">{data.city}, {data.country}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
