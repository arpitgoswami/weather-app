const { useState, useEffect } = React;

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('New York');
  const [cityDisplay, setCityDisplay] = useState('New York');
  const [bgImage, setBgImage] = useState('weather_clear_1786889472035.jpg');

  // WMO Weather interpretation codes
  const getWeatherInfo = (code) => {
    // Clear
    if (code === 0 || code === 1) return { text: 'Clear', type: 'clear' };
    // Cloudy
    if ([2, 3, 45, 48].includes(code)) return { text: 'Cloudy', type: 'cloudy' };
    // Rain
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code)) return { text: 'Rain', type: 'rain' };
    // Snow
    if ([71, 73, 75, 85, 86].includes(code)) return { text: 'Snow', type: 'snow' };
    
    return { text: 'Unknown', type: 'clear' };
  };

  const getBackgroundImage = (type) => {
    switch (type) {
      case 'clear': return 'weather_clear_1786889472035.jpg';
      case 'cloudy': return 'weather_cloudy_1786889484143.jpg';
      case 'rain': return 'weather_rain_1786889495878.jpg';
      case 'snow': return 'weather_snow_1786889508258.jpg';
      default: return 'weather_clear_1786889472035.jpg';
    }
  };

  const fetchWeather = async (searchCity) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Geocode the city name
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchCity)}&count=1`);
      const geoData = await geoRes.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found');
      }
      
      const { latitude, longitude, name, admin1, country } = geoData.results[0];
      setCityDisplay(`${name}${admin1 ? ', ' + admin1 : ''}`);

      // 2. Fetch weather using coordinates
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m`);
      const data = await weatherRes.json();
      
      const weatherInfo = getWeatherInfo(data.current.weather_code);
      setWeatherData({ ...data.current, info: weatherInfo });
      setBgImage(getBackgroundImage(weatherInfo.type));
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(query);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      fetchWeather(query);
    }
  };

  return (
    <>
      <div 
        className="background-layer" 
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="background-overlay" />
      
      <div className="app-container">
        
        <div className="search-container">
          <i className="ph ph-magnifying-glass search-icon"></i>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search for a city..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            disabled={loading}
          />
        </div>

        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Fetching weather...</p>
          </div>
        )}

        {error && !loading && (
          <div className="error-state">
            <i className="ph ph-warning-circle" style={{ fontSize: 48, marginBottom: 16 }}></i>
            <p>{error}</p>
            <button 
              onClick={() => fetchWeather('New York')}
              style={{ marginTop: 16, padding: '8px 16px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: 8, cursor: 'pointer' }}
            >
              Reset
            </button>
          </div>
        )}

        {!loading && !error && weatherData && (
          <>
            <div className="current-weather">
              <h1 className="city-name">{cityDisplay}</h1>
              <div className="temperature">
                {Math.round(weatherData.temperature_2m)}
                <span className="temp-unit">°C</span>
              </div>
              <div className="condition">{weatherData.info.text}</div>
            </div>

            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-header">
                  <i className="ph ph-thermometer"></i> Feels Like
                </div>
                <div className="metric-value">
                  {Math.round(weatherData.apparent_temperature)}°C
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <i className="ph ph-drop"></i> Humidity
                </div>
                <div className="metric-value">
                  {weatherData.relative_humidity_2m}%
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <i className="ph ph-wind"></i> Wind
                </div>
                <div className="metric-value">
                  {Math.round(weatherData.wind_speed_10m)} km/h
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <i className="ph ph-cloud-rain"></i> Precipitation
                </div>
                <div className="metric-value">
                  {weatherData.precipitation} mm
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
