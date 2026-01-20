import { GoogleGenAI } from "@google/genai";

export const handler = async (event: any) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { foodName } = JSON.parse(event.body || "{}");

    if (!foodName) {
      return { statusCode: 400, body: "Missing foodName" };
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `
Find recent nutritional research, health benefits, or dietary warnings for "${foodName}".
Return a concise 2–3 sentence summary suitable for Indian dietary context.
      `,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    // Extract grounded sources
    const sources: { title: string; uri: string }[] = [];
    const chunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    chunks.forEach((chunk: any) => {
      if (chunk.web?.title && chunk.web?.uri) {
        sources.push({
          title: chunk.web.title,
          uri: chunk.web.uri,
        });
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        text: response.text || "No insights found.",
        sources,
      }),
    };
  } catch (err: any) {
    console.error("healthInsights error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
