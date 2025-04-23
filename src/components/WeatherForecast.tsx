
import React from 'react';
import WeatherIcon from './WeatherIcon';
import { Card, CardContent } from "@/components/ui/card";

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {forecast.map((item, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="flex flex-col items-center justify-center p-4">
            <p className="font-medium text-center">{item.date}</p>
            <div className="my-4">
              <WeatherIcon iconCode={item.icon} size={48} className="text-primary mx-auto" />
            </div>
            <p className="text-center">
              {formatTemp(item.temp_min)}-{formatTemp(item.temp_max)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WeatherForecast;
