
import { GoogleGenAI, Type } from "@google/genai";
import { AAU_CAMPUSES } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function smartSearch(query: string) {
  const model = ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `The user is searching for something in Addis Ababa University. 
    Query: "${query}"
    Campuses available: ${AAU_CAMPUSES.map(c => `${c.name} (${c.id})`).join(', ')}.
    Return a JSON array of search results. Each result must have:
    - type: 'campus' | 'department' | 'service'
    - title: the name
    - subtitle: brief location or detail
    - campusId: the id of the campus it belongs to
    - id: unique id`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING },
            title: { type: Type.STRING },
            subtitle: { type: Type.STRING },
            campusId: { type: Type.STRING },
            id: { type: Type.STRING }
          },
          required: ["type", "title", "subtitle", "id"]
        }
      }
    }
  });

  try {
    const response = await model;
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini Search Error:", error);
    // Fallback: simple local search
    const lowerQuery = query.toLowerCase();
    return AAU_CAMPUSES.filter(c => 
      c.name.toLowerCase().includes(lowerQuery) || 
      c.shortName.toLowerCase().includes(lowerQuery)
    ).map(c => ({
      type: 'campus',
      title: c.name,
      subtitle: c.address,
      campusId: c.id,
      id: c.id
    }));
  }
}
