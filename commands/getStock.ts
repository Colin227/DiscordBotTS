import Stock from '../data/stock';
import dotenv from 'dotenv';

dotenv.config();

export default function getStock<Stock>(stockTicker: string): Promise<Stock> {
    return fetch(`https://yfapi.net/v6/finance/quote?region=CA&lang=en&symbols=${stockTicker}`, 
    { headers: {'x-api-key': process.env.stock_api_token}})
        .then(response => {
            if (!response.ok) {
                // console.log(process.env.weather_api_token);
                // console.log(location);
                // console.log(response);

                throw new Error(response.statusText)
            }
            return response.json() as Promise<Stock>
        })
}