import dotenv from 'dotenv';
import { OllamaRequest, OllamaResponse } from '../../data/index';

const OLLAMA_MODEL = 'llama3';
const CHUNK_SIZE = 10; // Send response every 10

dotenv.config();

export default function makePrompt(prompt: string, onChunk?: (chunk: string) => void): Promise<void> {
    const requestBody: OllamaRequest = {
        model: OLLAMA_MODEL,
        prompt: prompt,
        stream: true
    };

    return fetch(
        `${process.env.ollama_api_url}/api/generate`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
    }).then(response => {
        console.log("response: ", response);
        if (!response.ok) {
            console.log('BAD RESPONSE:', response);
            throw new Error(response.statusText);
        }
        if (!response.body) {
            throw new Error('No response body');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedText = "";

        const processStream = (): Promise<void> => {
            return reader.read().then(({ done, value }) => {
                if (done) {
                    return;
                }
                const res = decoder.decode(value, { stream: true });
                const ollamaRes: OllamaResponse = JSON.parse(res);
                accumulatedText += ollamaRes.response;
                console.log("ollama res: ", ollamaRes);
                const chunk = accumulatedText.slice(0, CHUNK_SIZE);
                accumulatedText = accumulatedText.slice(CHUNK_SIZE);
                if (onChunk) onChunk(chunk);

                // accumulatedText += ollamaRes.response;
                // if (onChunk) onChunk(accumulatedText);
                // This chunking is not working right...
                // // Send response every CHUNK_SIZE characters
                // while (accumulatedText.length >= CHUNK_SIZE) {
                //     const chunk = accumulatedText.slice(0, CHUNK_SIZE);
                //     accumulatedText = accumulatedText.slice(CHUNK_SIZE);
                //     if (onChunk) onChunk(chunk);
                // }

                return processStream(); // Continue processing stream
            });
        };
        return processStream();
        // return response.json() as Promise<OllamaResponse[]>;
    })
    .catch(error => {
        console.error("Streaming error:", error);
    });
}