
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, DisasterType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeSatelliteImage = async (base64Image: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image.split(',')[1] || base64Image,
            },
          },
          {
            text: `Analyze this satellite image for environmental disasters. 
            Identify if it shows a Forest Fire (smoke plumes, active flame fronts, burn scars), 
            a Tsunami (coastal inundation, massive receding water, destroyed infrastructure), 
            or if it is a Normal landscape (standard urban, forest, or ocean patterns).`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: {
              type: Type.STRING,
              description: 'The classification: FOREST_FIRE, TSUNAMI, or NORMAL',
            },
            confidence: {
              type: Type.NUMBER,
              description: 'Confidence score between 0 and 1',
            },
            reasoning: {
              type: Type.STRING,
              description: 'Detailed explanation of why this classification was chosen.',
            },
            detectedFeatures: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Key visual indicators found in the image.'
            },
            recommendedAction: {
              type: Type.STRING,
              description: 'Suggested emergency response action.'
            }
          },
          required: ["category", "confidence", "reasoning", "detectedFeatures", "recommendedAction"]
        }
      }
    });

    const result = JSON.parse(response.text);
    return {
      ...result,
      category: result.category as DisasterType
    };
  } catch (error) {
    console.error("Analysis failed:", error);
    throw new Error("Failed to process satellite imagery. Please check your connection and try again.");
  }
};
