
import React from 'react';
import { Wind, Droplet } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface WeatherDetailsProps {
  windSpeed: number;
  humidity: number;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ windSpeed, humidity }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-center text-sm font-medium mb-2">Wind Status</h3>
          <div className="flex items-center justify-center">
            <Wind className="mr-2 text-gray-500" size={20} />
            <span className="text-2xl font-bold">{windSpeed} km/h</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <h3 className="text-center text-sm font-medium mb-2">Humidity</h3>
          <div className="text-center">
            <p className="text-2xl font-bold mb-2">{humidity}%</p>
            <div className="w-full">
              <Progress value={humidity} className="h-2" />
              <div className="flex justify-between text-xs mt-1">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherDetails;
