export const handler = async (event: any) => {
  try {
    const { amount, currency = "INR" } = JSON.parse(event.body || "{}");
    const apiKey = process.env.GEMINI_API_KEY;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro-vision:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
Find 5 healthy Indian meals around ${amount} ${currency}.
Return JSON array with:
name, estimatedPrice, healthBenefits, calories
                  `,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    return {
      statusCode: 200,
      body: text,
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
