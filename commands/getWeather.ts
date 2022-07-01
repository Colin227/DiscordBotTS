import * as Weather from "../data/weather";
const config = require('../utils/environment');
import WeatherRequest from "../data/weatherRequest";

type WeatherResponse = typeof Weather;

export default function getWeather<WeatherResponse>(wr: WeatherRequest): Promise<WeatherResponse> {
    const { location, name } = wr;
    return fetch(`http://api.weatherapi.com/v1/forecast.json?key=${config.weather_api_token}&q=${location}&days=1&aqi=no&alerts=no`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<WeatherResponse>
        })
}