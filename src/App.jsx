import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=${
            import.meta.env.VITE_WEATHER_API
          }&q=${location}&days=4&aqi=yes&alerts=yes`
        );
        setWeatherData(res.data);
        //.then((res) => setWeatherData(res.data));
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    if (location) {
      fetchData();
    }
  }, [location]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  return (
    <div className="container">
      <div className="app-container">
        <h1 className="app-title">Weather App</h1>
        <div className="input-container">
          <input
            className="location-input"
            type="text"
            placeholder="Enter City"
            value={location}
            onChange={handleLocationChange}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>

      {weatherData && (
        <div className="weather-container">
          {weatherData.forecast.forecastday.map((day) => (
            <div className="day-container" key={day.date}>
              <h2 className="date">{day?.date}</h2>
              <img className="weather-icon" src={day.day.condition.icon} />
              <p className="temperature">{day.day.avgtemp_c}</p>
              <p className="temperature">{day.day.condition.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
