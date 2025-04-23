
import axios from 'axios';

// OpenWeatherMap API endpoints
const API_KEY = ''; // This will be provided by the user
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// Interfaces for typed responses
interface GeocodingResponse {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

interface WeatherResponse {
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  dt: number;
  sys: {
    country: string;
  };
  name: string;
}

interface ForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
      deg: number;
    };
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
  };
}

// Set API key
export const setApiKey = (key: string) => {
  localStorage.setItem('openweathermap_api_key', key);
};

// Get API key from local storage
export const getApiKey = (): string => {
  return localStorage.getItem('openweathermap_api_key') || '';
};

// Geocoding API to convert city name to coordinates
export const getCoordinates = async (city: string): Promise<GeocodingResponse> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('API key is required');
  
  try {
    const response = await axios.get(`${GEO_URL}/direct`, {
      params: {
        q: city,
        limit: 1,
        appid: apiKey
      }
    });
    
    if (response.data && response.data.length > 0) {
      return response.data[0];
    } else {
      throw new Error('City not found');
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }
};

// Get current weather by city name
export const getCurrentWeatherByCity = async (city: string) => {
  try {
    const coords = await getCoordinates(city);
    return getCurrentWeatherByCoords(coords.lat, coords.lon);
  } catch (error) {
    console.error('Error fetching weather by city:', error);
    throw error;
  }
};

// Get current weather by coordinates
export const getCurrentWeatherByCoords = async (lat: number, lon: number): Promise<WeatherResponse> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('API key is required');
  
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: 'metric' // Always get in metric and convert on frontend if needed
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

// Get weather forecast by city name
export const getForecastByCity = async (city: string) => {
  try {
    const coords = await getCoordinates(city);
    return getForecastByCoords(coords.lat, coords.lon);
  } catch (error) {
    console.error('Error fetching forecast by city:', error);
    throw error;
  }
};

// Get weather forecast by coordinates
export const getForecastByCoords = async (lat: number, lon: number): Promise<ForecastResponse> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('API key is required');
  
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: 'metric',
        cnt: 40 // 5 days forecast, 8 times per day (3h intervals)
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

// Helper functions to process data
export const formatCurrentWeather = (data: WeatherResponse) => {
  return {
    city: data.name,
    country: data.sys.country,
    date: new Date(data.dt * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    temp: data.main.temp,
    feels_like: data.main.feels_like,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    wind: {
      speed: data.wind.speed,
      deg: data.wind.deg
    },
    humidity: data.main.humidity
  };
};

export const formatForecastWeather = (data: ForecastResponse) => {
  // Group forecast by day and get one forecast per day (mid-day)
  const dailyForecasts = data.list.reduce((acc: any, item) => {
    const date = new Date(item.dt * 1000);
    const dateStr = date.toISOString().split('T')[0];
    
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    
    acc[dateStr].push(item);
    return acc;
  }, {});

  // Get only one forecast per day (around noon)
  const formattedForecast = Object.keys(dailyForecasts).map(date => {
    const forecasts = dailyForecasts[date];
    // Find forecast closest to noon
    let noonForecast = forecasts[0];
    let minDiff = Infinity;
    
    for (const forecast of forecasts) {
      const forecastDate = new Date(forecast.dt * 1000);
      const diff = Math.abs(forecastDate.getHours() - 12);
      if (diff < minDiff) {
        minDiff = diff;
        noonForecast = forecast;
      }
    }

    // Calculate min/max temp for the day
    let minTemp = Infinity;
    let maxTemp = -Infinity;
    
    for (const forecast of forecasts) {
      if (forecast.main.temp_min < minTemp) minTemp = forecast.main.temp_min;
      if (forecast.main.temp_max > maxTemp) maxTemp = forecast.main.temp_max;
    }
    
    return {
      date: new Date(noonForecast.dt * 1000).toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      }),
      icon: noonForecast.weather[0].icon,
      temp_min: minTemp,
      temp_max: maxTemp
    };
  });

  // Return only the next 3 days (excluding today)
  return formattedForecast.slice(1, 4);
};
