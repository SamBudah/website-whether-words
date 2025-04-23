
import React from 'react';
import { Cloud, CloudSun, Sun, Droplet, Wind, Thermometer } from 'lucide-react';

interface WeatherIconProps {
  iconCode: string;
  size?: number;
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode, size = 24, className = "" }) => {
  // Map OpenWeatherMap icon codes to Lucide icons
  const getIcon = () => {
    // First two characters of the icon code determine the weather condition
    const condition = iconCode.substring(0, 2);
    
    switch (condition) {
      case '01': // clear sky
        return <Sun size={size} className={className} />;
      case '02': // few clouds
      case '03': // scattered clouds
      case '04': // broken clouds
        return <CloudSun size={size} className={className} />;
      case '09': // shower rain
      case '10': // rain
      case '11': // thunderstorm
        return <Cloud size={size} className={className} />;
      case '13': // snow
        return <Cloud size={size} className={className} />;
      case '50': // mist, fog, etc.
        return <Cloud size={size} className={className} />;
      default:
        return <Sun size={size} className={className} />;
    }
  };

  return getIcon();
};

export default WeatherIcon;
