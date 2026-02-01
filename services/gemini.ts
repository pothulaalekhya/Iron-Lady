
import { GoogleGenAI, Type } from "@google/genai";

const getAiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Iron Lady Official AI Strategist - User Facing
 */
export const getLeadershipAdvice = async (
  userMessage: string, 
  history: {role: 'user' | 'model', parts: {text: string}[]}[] = [],
) => {
  const ai = getAiClient();
  
  const systemInstruction = `
    You are the Iron Lady Advisor. Your job is to help women achieve career breakthroughs.
    Be encouraging, clear, and professional. 
    
    KEY PROGRAMS:
    1. Leadership Essentials: 4 weeks for emerging leaders. Master office politics.
    2. 100 Board Members: 6 months for senior executives. Master boardroom strategy.
    3. Business Warfare: 1 year for C-Suite aspiring leaders. High-stakes influence.
    
    If someone asks for a mentor, tell them to use the "Talk to a Mentor" option.
    Keep answers under 3 short sentences. Focus on high-performance mindset.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    return { text: response.text };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: "I'm here to help. Could you please rephrase that?" };
  }
};

/**
 * AI Writing Assistant - Fixes spelling, grammar, and tone.
 */
export const getWritingHelp = async (text: string) => {
  if (!text || text.length < 5) return text;
  const ai = getAiClient();
  
  const systemInstruction = `
    You are a professional editor for Iron Lady. 
    Fix any spelling, punctuation, or grammar errors in the provided text.
    Improve the tone to be confident, professional, and clear without changing the core meaning.
    Return ONLY the corrected text.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: text,
      config: { systemInstruction },
    });
    return response.text?.trim() || text;
  } catch (e) {
    return text;
  }
};

/**
 * Internal Intelligence Copilot - Team Facing
 * Provides specific response suggestions based on the latest user query.
 */
export const getChatIntelligence = async (messages: any[]) => {
  const ai = getAiClient();
  const historyText = messages.map(m => `${m.sender}: ${m.text}`).join('\n');

  const systemInstruction = `
    Analyze this Iron Lady customer conversation. 
    Focus intensely on the LATEST query from the user.
    
    Provide suggestions that specifically answer that query while maintaining the Iron Lady's high-performance tone.
    
    Return JSON with:
    1. intent: The detected goal of the user (e.g. "Fee Inquiry", "Curriculum Question").
    2. summary: A brief summary of the user's current need.
    3. suggestions: 3 objects {label, short, detailed}.
       - label: Short description of the draft type.
       - short: A direct, one-sentence answer.
       - detailed: A professional, warmer response (3 sentences max).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `CHAT HISTORY:\n${historyText}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            intent: { type: Type.STRING },
            summary: { type: Type.STRING },
            suggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  short: { type: Type.STRING },
                  detailed: { type: Type.STRING }
                },
                required: ["label", "short", "detailed"]
              }
            }
          },
          required: ["intent", "summary", "suggestions"]
        }
      },
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    return { 
      intent: "General Inquiry", 
      summary: "Customer needs help.", 
      suggestions: [{ label: "Help", short: "How can I assist you?", detailed: "Welcome to Iron Lady Support. I am here to guide you through our elite programs." }] 
    };
  }
};

// Fix error in CreativeStudio.tsx: Added missing analyzeBrandImage export
/**
 * Analyzes a branding image for leadership presence.
 */
export const analyzeBrandImage = async (base64Image: string, prompt: string) => {
  const ai = getAiClient();
  
  // Extract mime type and base64 data from Data URL
  const [header, data] = base64Image.split(',');
  const mimeType = header.split(':')[1].split(';')[0];

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { mimeType, data } },
        { text: prompt || "Analyze the leadership presence and branding in this image. Provide professional actionable insights." }
      ]
    }
  });

  return response.text || "Analysis currently unavailable.";
};

// Fix error in CreativeStudio.tsx: Added missing generateBrandImagePro export
/**
 * Generates a high-quality brand image using Gemini 3 Pro.
 */
export const generateBrandImagePro = async (prompt: string, aspectRatio: string = "1:1") => {
  const ai = getAiClient();
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: aspectRatio as any,
        imageSize: "1K"
      }
    }
  });

  // Iterating through all parts to find the image part as per guidelines
  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  }
  
  throw new Error("The model did not return any image data.");
};
