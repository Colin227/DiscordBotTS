import { ApplicationCommandPermissionTypes } from "discord.js/typings/enums";
// import * as Weather from "../data/weather";
import dotenv from 'dotenv';
import { Translate } from "../../data";


dotenv.config();

export default function getTranslation<Translate>(lang: string, sanitizedInput: string): Promise<Translate> {
    return fetch(
        `${process.env.translate_api_url}/translate`, {
        method: "POST",
        body: JSON.stringify({
            q: sanitizedInput,
            source: 'auto',
            target: lang
        }),
        headers: { "Content-Type": "application/json" }
    }).then(response => {
        console.log("translate response: ", response.body);
        if (!response.ok) {
            console.log('BAD RESPONSE:', response);
    
            throw new Error(response.statusText);
        }
        return response.json() as Promise<Translate>;
    })
    
    
}