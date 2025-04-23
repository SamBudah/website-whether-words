
import React from 'react';
import { Wind, Droplet, Thermometer, Sunrise, Sunset, Eye } from 'lucide-react';

interface WeatherDetailsProps {
  windSpeed?: number | null;
  humidity?: number | null;
  pressure?: number | null;
  visibility?: number | null;
  sunrise?: string | null;
  sunset?: string | null;
}

const detailVal = (val: number | string | null | undefined, unit: string | undefined = '', bold: boolean = false) =>
  <span className={bold ? "font-black text-blue-800" : "font-semibold"}>{val == null || val === "" ? '--' : val} {unit}</span>;

const WeatherDetails: React.FC<WeatherDetailsProps> = ({
  windSpeed, humidity, pressure, visibility, sunrise, sunset
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      <div className="flex flex-col items-center">
        <Wind className="text-blue-600 mb-2" size={30} />
        <div className="text-base text-gray-500">Wind</div>
        <div className="text-lg">{detailVal(windSpeed, "km/h", true)}</div>
      </div>
      <div className="flex flex-col items-center">
        <Droplet className="text-blue-600 mb-2" size={30} />
        <div className="text-base text-gray-500">Humidity</div>
        <div className="text-lg">{detailVal(humidity, "%", true)}</div>
      </div>
      <div className="flex flex-col items-center">
        <Thermometer className="text-blue-600 mb-2" size={30} />
        <div className="text-base text-gray-500">Pressure</div>
        <div className="text-lg">{detailVal(pressure, "hPa", true)}</div>
      </div>
      <div className="flex flex-col items-center">
        <Eye className="text-blue-600 mb-2" size={30} />
        <div className="text-base text-gray-500">Visibility</div>
        <div className="text-lg">{detailVal(visibility, "km", true)}</div>
      </div>
      <div className="flex flex-col items-center">
        <Sunrise className="text-blue-600 mb-2" size={30} />
        <div className="text-base text-gray-500">Sunrise</div>
        <div className="text-lg">{detailVal(sunrise, "AM", false)}</div>
      </div>
      <div className="flex flex-col items-center">
        <Sunset className="text-blue-600 mb-2" size={30} />
        <div className="text-base text-gray-500">Sunset</div>
        <div className="text-lg">{detailVal(sunset, "PM", false)}</div>
      </div>
    </div>
  );
};

export default WeatherDetails;
