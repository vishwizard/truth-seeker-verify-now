export type VerificationResult = {
  isTrue: boolean | null;
  confidence: number;
  explanation: string;
  sources?: string[];
};

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI("");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const verifyText = async (text: string): Promise<VerificationResult> => {
  try {
    const prompt = `
      Verify the following claim for truthfulness:
      "${text}"
      
      Respond with these fields:
      - isTrue: boolean or null if uncertain
      - confidence: number between 0 and 1
      - explanation: string explaining your reasoning
      - sources: array of reference URLs
    `;

    // Request JSON directly
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        response_mime_type: "application/json"
      }
    });
    
    const response = await result.response;
    const content = response.text();
    
    try {
      return JSON.parse(content);
    } catch (parseError) {
      console.error("Failed to parse Gemini response as JSON:", parseError);
      return {
        isTrue: null,
        confidence: 0.5,
        explanation: content,
        sources: []
      };
    }
  } catch (error) {
    console.error("Verification Error:", error);
    throw error;
  }
};
