function extractJson(text: string): string {
  return text
    .replace(/```json/i, "")
    .replace(/```/g, "")
    .trim();
}

export const handler = async (event: any) => {
  try {
    const { amount, preferences = [] } = JSON.parse(event.body || "{}");

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY not set");

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
Return ONLY valid JSON array.
No markdown.
No explanation.

Find 5 healthy Indian meals around ${amount} INR.
Preferences: ${preferences.join(", ")}

Each item must have:
- name
- estimatedPrice
- healthBenefits
- calories
- macronutrients
- cookingSteps (array)
                  `.trim(),
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    // 🔥 DEBUG LOG (critical)
    console.log("Gemini raw response:", JSON.stringify(data, null, 2));

    // ✅ Extract ALL text parts safely
    const parts = data?.candidates?.[0]?.content?.parts ?? [];

    const combinedText = parts
      .map((p: any) => p.text)
      .filter(Boolean)
      .join("\n");

    if (!combinedText) {
      throw new Error("No Gemini response text found");
    }

    // 🧹 Strip accidental markdown
    const clean = combinedText
      .replace(/```json/i, "")
      .replace(/```/g, "")
      .trim();

    // ✅ Validate JSON
    const parsed = JSON.parse(clean);

    return {
      statusCode: 200,
      body: JSON.stringify(parsed),
    };
  } catch (err: any) {
    console.error("budgetMeals error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
