export const handler = async (event: any) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { base64Image } = JSON.parse(event.body || "{}");

    if (!base64Image) {
      return { statusCode: 400, body: "Missing image" };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not set");
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    mimeType: "image/jpeg",
                    data: base64Image.split(",")[1] || base64Image,
                  },
                },
                {
                  text: `
Analyze this food image and return STRICT JSON with:
- foodName
- calories (number)
- protein
- carbs
- fats
- healthierAlternatives (3 items: name, calories, benefits)
- summary
                  `,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("No text returned from Gemini");

    return {
      statusCode: 200,
      body: text,
    };
  } catch (err: any) {
    console.error("analyzeFood error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
