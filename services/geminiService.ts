import { GoogleGenAI } from "@google/genai";
import { DreamResultData, GroundingChunk, SearchSource } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const dreamSearch = async (query: string): Promise<DreamResultData> => {
  const ai = getAiClient();
  
  // We want a model that supports search grounding.
  const modelName = 'gemini-2.5-flash';

  const prompt = `
    You are "Drift", a cybernetic search engine entity existing in the digital grid.
    
    User Query: "${query}"

    Instructions:
    1. Use Google Search to find accurate, real-world information about the query.
    2. Synthesize the answer into a "Digital Narrative". This should be factually correct but written in a concise, slightly technical, cyberpunk or "Tron-like" tone. Use metaphors of data streams, nodes, grids, and neon.
    3. Keep the narrative concise (under 150 words).
    4. Do NOT explicitly list URLs in the text response; the system will handle the grounding citations visually.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const candidate = response.candidates?.[0];
    const narrative = candidate?.content?.parts?.[0]?.text || "Signal lost in the grid... re-initiate.";
    
    // Extract sources from grounding chunks
    const rawChunks = candidate?.groundingMetadata?.groundingChunks as GroundingChunk[] | undefined;
    const sources: SearchSource[] = [];

    if (rawChunks) {
      rawChunks.forEach((chunk) => {
        if (chunk.web?.uri && chunk.web?.title) {
          sources.push({
            url: chunk.web.uri,
            title: chunk.web.title,
          });
        }
      });
    }

    // Remove duplicates based on URL
    const uniqueSources = sources.filter((v, i, a) => a.findIndex(v2 => (v2.url === v.url)) === i);

    return {
      narrative,
      sources: uniqueSources
    };

  } catch (error) {
    console.error("Drift search failed:", error);
    throw error;
  }
};