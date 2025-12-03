
import { GoogleGenAI, Chat } from "@google/genai";

// Initialize Gemini Client
// IMPORTANT: In a real app, strict error handling for missing API keys should be in place.
// The prompt instructions say assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const createStylistChat = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are 'MartzBot', a premier fashion consultant for 'MI Martz', a high-end luxury shoe brand based in Pakistan.
      Your tone is sophisticated, polite, and brief.
      You help customers choose shoes based on their outfit or occasion.
      The available shoe types are: Oxfords, Loafers, Luxury Sneakers, Chelsea Boots, High Heels, and Derbies.
      Prices are in Pakistani Rupees (PKR).
      Do not mention prices unless asked. Focus on style, material, and color coordination.
      Keep responses under 50 words.`,
    },
  });
};

export const sendMessageToStylist = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response = await chat.sendMessage({ message });
    return response.text || "I apologize, I am currently consulting with another client. Please try again momentarily.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am having trouble connecting to the fashion archives. Please try again.";
  }
};
