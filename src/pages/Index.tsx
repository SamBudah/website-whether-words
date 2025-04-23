
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

  // Utility for section cards
  const sectionCard = (children: React.ReactNode, className?: string) => (
    <div className={`bg-white rounded-xl shadow-md px-8 py-8 mb-8 ${className ?? ''}`}>{children}</div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f8fa]">
      {/* App Header */}
      <header className="w-full text-center pt-12 pb-2 mb-2">
        <h1 className="text-[2.5rem] font-extrabold text-blue-600 tracking-tight">Weather App</h1>
      </header>

      {/* Search & Settings Row */}
      <div className="flex justify-center gap-4 items-center w-full px-4 max-w-3xl mx-auto">
        <div className="flex-1">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div>
          <UnitToggle unit={unit} onToggle={toggleUnit} />
        </div>
      </div>

      {/* Cards/main sections */}
      <main className="flex flex-col w-full max-w-4xl mx-auto mt-6 flex-1">

        {/* Current Weather Card */}
        {sectionCard(
          loading ? (
            <div className="text-lg text-center py-14 text-gray-400">Loading weather data...</div>
          ) : error ? (
            <div className="flex flex-col items-center">
              <div className="text-red-700 font-bold">{error}</div>
              <Button variant="outline" onClick={() => setIsApiKeyModalOpen(true)} className="mt-3">
                Update API Key
              </Button>
            </div>
          ) : currentWeather ? (
            <CurrentWeather data={currentWeather} unit={unit} />
          ) : (
            <div className="flex flex-row items-center justify-between min-h-[128px]">
              <div className="flex flex-col gap-2">
                <div className="text-3xl font-bold text-gray-800">City Name</div>
                <div className="text-base text-gray-500">Current Date</div>
                <div className="text-md text-gray-600 mt-2">Weather Description</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <img 
                  src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/000000/external-weather-weather-flatart-icons-flat-flatarticons-1.png" 
                  alt="Weather icon" className="w-12 h-12 object-contain mr-2" 
                />
                <div className="flex items-center text-gray-400 font-medium text-lg">
                  <span className="text-2xl font-bold mr-1">--</span>
                  <span className="text-lg">°</span>
                </div>
                <div className="text-right text-gray-500 text-xs mt-1">
                  Feels like: --°
                </div>
              </div>
            </div>
          )
        )}

        {/* Weather Details Card */}
        {sectionCard(
          <>
            <div className="text-blue-700 font-bold text-lg mb-3">Weather Details</div>
            <WeatherDetails
              windSpeed={currentWeather?.wind?.speed ?? null}
              humidity={currentWeather?.humidity ?? null}
              pressure={currentWeather?.pressure ?? null}
              visibility={currentWeather?.visibility ?? null}
              sunrise={currentWeather?.sunrise ?? null}
              sunset={currentWeather?.sunset ?? null}
            />
          </>
        )}

        {/* 3-Day Forecast Card */}
        {sectionCard(
          <>
            <div className="text-blue-700 font-bold text-lg mb-3">3-Day Forecast</div>
            <WeatherForecast forecast={forecast} unit={unit} />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="text-gray-400 text-sm text-center pb-6 pt-10">
        Weather App - © 2025
      </footer>

      {/* API Key Modal */}
      <APIKeyModal isOpen={isApiKeyModalOpen} onClose={handleApiKeySubmit} />
    </div>
  );
};

export default Index;
