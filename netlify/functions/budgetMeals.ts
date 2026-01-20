import { GoogleGenAI, Type } from "@google/genai";

export const handler = async (event: any) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { amount, currency = "INR" } = JSON.parse(event.body || "{}");

    if (!amount || isNaN(Number(amount))) {
      return { statusCode: 400, body: "Invalid budget amount" };
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `
Find 5 healthy and nutritious meal options commonly available in India
for approximately ${amount} ${currency}.
Focus on street food, tiffin meals, or home-style dishes.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              estimatedPrice: { type: Type.STRING },
              healthBenefits: { type: Type.STRING },
              calories: { type: Type.STRING },
            },
            required: [
              "name",
              "estimatedPrice",
              "healthBenefits",
              "calories",
            ],
          },
        },
      },
    });

    if (!response.text) {
      throw new Error("No response from Gemini");
    }

    return {
      statusCode: 200,
      body: response.text,
    };
  } catch (err: any) {
    console.error("budgetMeals error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
