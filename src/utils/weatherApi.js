export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`,
  ).then((res) => {
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  });
};

export const filterWeatherData = (data) => {
  const tempF = data.main.temp;
  const tempC = ((tempF - 32) * 5) / 9;

  return {
    city: data.name,
    temp: {
      F: Math.round(tempF),
      C: Math.round(tempC),
    },
    type: data.main.temp >= 72 ? "hot" : data.main.temp >= 66 ? "warm" : "cold",

    condition: data.weather[0].main,
    isNight: data.dt < data.sys.sunrise || data.dt > data.sys.sunset,
  };
};
