const { API_KEY } = require('./config.json');
const prompt = require("prompt-sync")({ sigint: true });

const city = prompt("Please enter a city: ");
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

const axios = require('axios')

function getWeather() {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

getWeather()
    .then(weatherData => {
        temp_celsius = weatherData.main.temp
        temp_celsius_feels_like = weatherData.main.feels_like
        sunrise_time = new Date((
            weatherData.sys.sunrise) * 1000).toString()
        sunset_time = new Date((
            weatherData.sys.sunset) * 1000).toString()
        clouds = weatherData.weather[0].description
        wind_speed = weatherData.wind.speed
        wind_degrees = weatherData.wind.deg
        place = weatherData.name
        identification = weatherData.id
        timezone = weatherData.timezone
        humidity = weatherData.main.humidity
        Time_id = new Date((
            weatherData.dt) * 1000).toString()
        console.log(``)
        console.log(`Temperature in ${city}: ${temp_celsius}°C`)
        console.log(`Temperature in ${city} feels like: ${temp_celsius_feels_like}°C`)
        console.log(`Humidity in ${city}: ${humidity} % `)
        console.log(`Wind speed in ${city}: ${wind_speed}m / s`)
        console.log(`Wind direction in ${city}: ${wind_degrees}°`)
        console.log(`General Weather in ${city}: ${clouds}`)
        console.log(`Sun rises in ${city} at ${sunrise_time} local time`)
        console.log(`Sun sets in ${city} at ${sunset_time} local`)
    })
    .catch(error => {
        console.log("Error: " + error.message);
    });

