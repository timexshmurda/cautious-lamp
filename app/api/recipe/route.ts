import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [
          {
            role: "system",
            content: "You are an expert chef. Provide detailed recipes including ingredient quantities for the number of servings requested, step-by-step instructions, and estimated cooking time.",
          },
          {
            role: "user",
            content: query,
          },
        ],
      }),
    });

    const data = await response.json();

    console.log("Deepseek API response:", data); // For debugging

    // Make sure to return this as `result` to match frontend
    return NextResponse.json({ result: data.choices?.[0]?.message?.content || "No recipe found." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
