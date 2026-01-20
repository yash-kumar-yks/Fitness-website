import { GoogleGenAI, Type } from "@google/genai";

export const handler = async (event: any) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { base64Image } = JSON.parse(event.body || "{}");

    if (!base64Image) {
      return { statusCode: 400, body: "Missing image" };
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!, // 🔐 secure
    });

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image.split(",")[1] || base64Image,
            },
          },
          {
            text: `
Analyze this food image and return JSON with:
- foodName
- calories
- protein
- carbs
- fats
- healthierAlternatives (3 items)
- summary
            `,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            foodName: { type: Type.STRING },
            calories: { type: Type.NUMBER },
            protein: { type: Type.STRING },
            carbs: { type: Type.STRING },
            fats: { type: Type.STRING },
            healthierAlternatives: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  calories: { type: Type.NUMBER },
                  benefits: { type: Type.STRING },
                },
                required: ["name", "calories", "benefits"],
              },
            },
            summary: { type: Type.STRING },
          },
          required: [
            "foodName",
            "calories",
            "protein",
            "carbs",
            "fats",
            "healthierAlternatives",
            "summary",
          ],
        },
      },
    });

    return {
      statusCode: 200,
      body: response.text!,
    };
  } catch (err: any) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
