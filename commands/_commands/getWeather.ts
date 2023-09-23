import { ApplicationCommandPermissionTypes } from "discord.js/typings/enums";
// import * as Weather from "../data/weather";
import dotenv from 'dotenv';
import Weather from "../../data/weather";


dotenv.config();
// const config = require('../utils/environment');



// import WeatherRequest from "../data/weatherRequest";

// type WeatherResponse = typeof Weather;

export default function getWeather<WeatherResponse>(location: string): Promise<WeatherResponse> {
    return fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.weather_api_token}&q=${location}&days=2&aqi=no&alerts=no`)
        .then(response => {
            if (!response.ok) {
                // console.log(process.env.weather_api_token);
                // console.log(location);
                // console.log(response);

                throw new Error(response.statusText)
            }
            return response.json() as Promise<WeatherResponse>
        })
}