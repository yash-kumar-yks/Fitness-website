function extractJson(text: string): string {
  return text
    .replace(/```json/i, "")
    .replace(/```/g, "")
    .trim();
}

export const handler = async (event: any) => {
  try {
    const { amount, currency = "INR" } = JSON.parse(event.body || "{}");
    const apiKey = process.env.GEMINI_API_KEY;

    if (!amount) {
      throw new Error("Amount is required");
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
Return ONLY valid JSON.
Do NOT use markdown or explanations.

Return array:
[
  {
    "name": string,
    "estimatedPrice": string,
    "healthBenefits": string,
    "calories": string
  }
]

Find 5 healthy Indian meals around ${amount} ${currency}.
                  `,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await res.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error("No response text from Gemini");
    }

    const cleanJson = extractJson(rawText);
    JSON.parse(cleanJson); // validate

    return {
      statusCode: 200,
      body: cleanJson,
    };
  } catch (err: any) {
    console.error("budgetMeals error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
