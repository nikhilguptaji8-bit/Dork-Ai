import { GoogleGenAI, Type } from "@google/genai";
import { AIResponse, GroundingSource } from "../types";
import { DORK_AI_INSTRUCTIONS } from "./systemInstructions";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export const getAIResponse = async (query: string): Promise<AIResponse> => {
  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: query,
    config: {
      systemInstruction: DORK_AI_INSTRUCTIONS,
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          type: {
            type: Type.STRING,
            description: "The type of response: 'chat' or 'dorks'."
          },
          message: {
            type: Type.STRING,
            description: "The conversational response or explanation."
          },
          dorks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                dork: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              propertyOrdering: ["dork", "description"]
            }
          }
        },
        propertyOrdering: ["type", "message", "dorks"]
      }
    },
  });

  try {
    const jsonStr = response.text?.trim() || "{}";
    const parsed = JSON.parse(jsonStr) as AIResponse;

    const sources: GroundingSource[] = [];
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (groundingChunks) {
      groundingChunks.forEach((chunk: any) => {
        if (chunk.web && chunk.web.uri && chunk.web.title) {
          sources.push({
            title: chunk.web.title,
            url: chunk.web.uri
          });
        }
      });
    }

    if (sources.length > 0) {
      parsed.sources = sources;
    }

    return parsed;

  } catch (error) {
    return {
      type: "chat",
      message: "Error processing AI response.",
    };
  }
};
