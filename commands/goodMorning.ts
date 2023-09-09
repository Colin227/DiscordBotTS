
import dotenv from 'dotenv';

dotenv.config();

export default function getMorningMessage<WeatherResponse>(location: string): Promise<WeatherResponse> {
    return fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.weather_api_token}&q=${location}&days=1&aqi=no&alerts=no`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json() as Promise<WeatherResponse>
    })
}