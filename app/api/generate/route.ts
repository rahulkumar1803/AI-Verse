// File: app/api/gemini/route.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Get the prompt from the request body
  const { prompt } = await req.json();

  // Ensure the API key is set
  if (!process.env.GOOGLE_API_KEY) {
    return new NextResponse("Missing API key", { status: 500 });
  }

  // Initialize the Gemini client
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    // Call the Gemini API
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Return the generated text
    return NextResponse.json({ text });

  } catch (error) {
    console.error("Gemini API call failed:", error);
    return new NextResponse("Error generating content", { status: 500 });
  }
}