import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface SchoolRecommendation {
  name: string;
  location: string;
  curriculum: string;
  levels: string;
  budget: string;
  description: string;
  whyFit: string;
  extracurriculars: string[];
  disabilitySupport: string;
  website?: string;
}

export async function getSchoolRecommendations(params: {
  budget: string;
  disabilitySupport: string;
  curriculum: string;
  levels: string;
  location: string;
  extracurriculars: string;
  childPersonality: string;
  childDescription: string;
}): Promise<SchoolRecommendation[]> {
  const prompt = `
    You are an expert educational consultant for Kenyan schools. 
    A parent is looking for the best school for their child with the following criteria:
    - Budget: ${params.budget}
    - Disability Support Needed: ${params.disabilitySupport}
    - Preferred Curriculum: ${params.curriculum}
    - School Levels: ${params.levels}
    - Preferred Location: ${params.location}
    - Extracurricular Interests: ${params.extracurriculars}
    - Child's Personality: ${params.childPersonality}
    - Child's Description: ${params.childDescription}

    Based on these factors, recommend the 10 best-fit schools in Kenya. 
    Use real, up-to-date data. For each school, provide:
    1. School Name
    2. Location (City/Neighborhood)
    3. Curriculum (e.g., CBC, British, IGCSE, 8-4-4)
    4. Levels (e.g., Kindergarten, Primary, Secondary)
    5. Estimated Budget/Fees (if known)
    6. General Description of the school
    7. Why it is a perfect fit for this specific child
    8. Key Extracurricular activities
    9. Disability support details
    10. Official Website URL (if available)

    Return the results as a JSON array of objects.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            location: { type: Type.STRING },
            curriculum: { type: Type.STRING },
            levels: { type: Type.STRING },
            budget: { type: Type.STRING },
            description: { type: Type.STRING },
            whyFit: { type: Type.STRING },
            extracurriculars: { type: Type.ARRAY, items: { type: Type.STRING } },
            disabilitySupport: { type: Type.STRING },
            website: { type: Type.STRING },
          },
          required: ["name", "location", "curriculum", "levels", "budget", "description", "whyFit", "extracurriculars", "disabilitySupport"],
        },
      },
    },
  });

  try {
    const text = response.text;
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Failed to get recommendations. Please try again.");
  }
}
