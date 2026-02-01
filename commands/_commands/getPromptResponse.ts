import dotenv from 'dotenv';
import { OllamaRequest, OllamaResponse } from '../../data/index';

const OLLAMA_MODEL = 'llama3';
// const CHUNK_SIZE = 10; // Send response every 10
const OLLAMA_API_URL = process.env.ollama_api_url;

dotenv.config();

export default async function generateText(
    prompt: string,
) {

    // // --- Input Validation and Configuration ---
    // if (!OLLAMA_API_URL) {
    //     console.error("Error: OLLAMA_API_URL environment variable is not set.");
    //     throw new Error("Ollama API URL is not configured.");
    // }

    // const model = options?.model ?? OLLAMA_MODEL;
    // // const chunkSize = options?.chunkSize ?? CHUNK_SIZE;
    const fullPrompt = `${prompt} Ensure your response is no more than 2000 characters.`;

    const requestBody: OllamaRequest = {
        model: OLLAMA_MODEL,
        prompt: fullPrompt,
        stream: false
    };

    try {
        const response = await fetch(
            `${OLLAMA_API_URL}/api/generate`, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: { "Content-Type": "application/json" }
        });
        // --- Basic Response Validation ---
        if (!response.ok) {
            // Attempt to read error body for more details
            let errorBody = `Status: ${response.status} ${response.statusText}`;
            try {
                const text = await response.text();
                errorBody += `\nBody: ${text}`;
            } catch (_) { /* Ignore error reading body */ }
            console.error('Ollama API request failed:', errorBody);
            throw new Error(`Ollama API request failed: ${response.statusText}`);
        }

        if (!response.body) {
            throw new Error('No response body received from Ollama API.');
        }
        const data = await response.json() as OllamaResponse;

        return data.response;

    } catch (error) {
        console.error("Error in generateText function:", error);
        // Re-throw the error so the caller can handle it
        throw error;
    }


}