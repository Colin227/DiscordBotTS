export namespace WeatherResponse {

    export interface Location {
        name: string;
        region: string;
        country: string;
        lat: number;
        lon: number;
        tz_id: string;
        localtime_epoch: number;
        localtime: string;
    }

    export interface Condition {
        text: string;
        icon: string;
    }

    export interface Current {
        last_updated: string;
        temp_c: number;
        is_day: number;
        condition: Condition;
        precip_mm: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        uv: number;
    }

    export interface Condition2 {
        text: string;
        icon: string;
        code: number;
    }

    export interface Day {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        avgtemp_c: number;
        avgtemp_f: number;
        maxwind_mph: number;
        maxwind_kph: number;
        totalprecip_mm: number;
        totalprecip_in: number;
        avgvis_km: number;
        avgvis_miles: number;
        avghumidity: number;
        daily_will_it_rain: number;
        daily_chance_of_rain: number;
        daily_will_it_snow: number;
        daily_chance_of_snow: number;
        condition: Condition2;
        uv: number;
    }

    export interface Astro {
        sunrise: string;
        sunset: string;
        moonrise: string;
        moonset: string;
        moon_phase: string;
        moon_illumination: string;
    }

    export interface Condition3 {
        text: string;
        icon: string;
    }

    export interface Hour {
        time: string;
        temp_c: number;
        is_day: number;
        condition: Condition3;
        precip_mm: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        will_it_rain: number;
        chance_of_rain: number;
        will_it_snow: number;
        chance_of_snow: number;
    }

    export interface Forecastday {
        date: string;
        date_epoch: number;
        day: Day;
        astro: Astro;
        hour: Hour[];
    }

    export interface Forecast {
        forecastday: Forecastday[];
    }

    export interface RootObject {
        location: Location;
        current: Current;
        forecast: Forecast;
    }

}