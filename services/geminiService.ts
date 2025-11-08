
import { GoogleGenAI } from "@google/genai";
import { AnalysisResult, GroundingSource } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const PROMPT = `You are an expert on waste sorting and recycling in Finland. Analyze the primary object in this image. Based on current Finnish waste sorting regulations, provide the following information in a clear, concise format using Markdown:

### **Item Identification**
Identify the item shown in the image.

### **Bin Category**
State the correct waste bin (e.g., Biowaste, Cardboard, Plastic Packaging, Metal, Glass Packaging, Mixed Waste, Hazardous Waste).

### **Sorting Instructions**
Give a brief explanation and any necessary preparation steps (e.g., 'Rinse the container,' 'Flatten the box,' 'Remove the cap').

Use Google Search to verify the latest sorting rules for Finland to ensure your answer is accurate and up-to-date.`;

export const analyzeWasteImage = async (
  base64ImageData: string,
  mimeType: string
): Promise<AnalysisResult> => {
  try {
    const imagePart = {
      inlineData: {
        data: base64ImageData,
        mimeType: mimeType,
      },
    };

    const textPart = {
      text: PROMPT,
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts: [imagePart, textPart] },
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("API returned no text in the response.");
    }
    
    const rawSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: GroundingSource[] = rawSources
      .filter((s: any) => s.web && s.web.uri && s.web.title)
      .map((s: any) => ({
        uri: s.web.uri,
        title: s.web.title,
      }));

    return { text, sources };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
};
