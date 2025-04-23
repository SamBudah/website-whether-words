
import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import CurrentWeather from '@/components/CurrentWeather';
import WeatherForecast from '@/components/WeatherForecast';
import WeatherDetails from '@/components/WeatherDetails';
import UnitToggle from '@/components/UnitToggle';
import APIKeyModal from '@/components/APIKeyModal';
import { Button } from '@/components/ui/button';
import { 
  getCurrentWeatherByCity, 
  getForecastByCity, 
  formatCurrentWeather, 
  formatForecastWeather,
  getApiKey,
  setApiKey
} from '@/services/weatherService';

const Index = () => {
  const [apiKey, setApiKeyState] = useState(getApiKey());
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(!apiKey);
  const [city, setCity] = useState('London'); // Default city
  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch weather data when city changes
  useEffect(() => {
    if (!apiKey) return;
    
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch current weather
        const currentWeatherData = await getCurrentWeatherByCity(city);
        setCurrentWeather(formatCurrentWeather(currentWeatherData));
        
        // Fetch forecast
        const forecastData = await getForecastByCity(city);
        setForecast(formatForecastWeather(forecastData));
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Failed to fetch weather data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeatherData();
  }, [city, apiKey]);

  // Handle API key submission
  const handleApiKeySubmit = (key?: string) => {
    if (key) {
      setApiKey(key);
      setApiKeyState(key);
    }
    setIsApiKeyModalOpen(false);
  };

  // Handle city search
  const handleSearch = (query: string) => {
    setCity(query);
  };

  // Toggle temperature unit
  const toggleUnit = () => {
    setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with API key button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Weather App</h1>
          <Button 
            variant="outline" 
            onClick={() => setIsApiKeyModalOpen(true)}
            className="text-sm"
          >
            Update API Key
          </Button>
        </div>
        
        {/* Search and unit toggle */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <SearchBar onSearch={handleSearch} />
          <UnitToggle unit={unit} onToggle={toggleUnit} />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">Loading weather data...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-600">{error}</p>
            <Button variant="outline" onClick={() => setIsApiKeyModalOpen(true)} className="mt-2">
              Update API Key
            </Button>
          </div>
        ) : currentWeather ? (
          <div className="space-y-6">
            {/* Main layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Current weather */}
              <div className="md:col-span-1">
                <CurrentWeather data={currentWeather} unit={unit} />
              </div>

              {/* Forecast */}
              <div className="md:col-span-2">
                <WeatherForecast forecast={forecast} unit={unit} />
                
                {/* Weather details */}
                <WeatherDetails 
                  windSpeed={currentWeather.wind.speed}
                  humidity={currentWeather.humidity}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">Enter a city to view weather information</p>
          </div>
        )}
      </div>

      {/* API Key Modal */}
      <APIKeyModal isOpen={isApiKeyModalOpen} onClose={handleApiKeySubmit} />
    </div>
  );
};

export default Index;
