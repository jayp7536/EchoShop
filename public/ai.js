/*
- Takes OCR text as input
- Uses AI to interpret it
- Returns the processed response to the server
*/

import { CohereClient } from "cohere-ai";
import { speakText } from "./tts.js";

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

export async function getMainCategory(text) {
  console.log("Analyzing OCR text with Cohere...");

  try {
    const response = await cohere.chat({
      model: "command-a-vision-07-2025",
      message: `You are an OCR text summarizer.
      Your only task is to output a *very short* label describing the main category or idea from the sign text below.

      STRICT RULES:
        - Output ONLY a few words.
        - NO explanations, NO sentences.
        - If the text looks like a store sign or aisle label, end it with "aisle".
        - Use only words that appear in the text.


      Example: "chips, candy, crackers" -> "SNACK aisle"
      Example: "FOOD, spinach, bread, cheese" -> "FOOD aisle"
      Example: "MEAT and SEAFOOD Fresh Daily" -> "MEAT and SEAFOOD aisle"

      Here’s the OCR text:
      ${text}`,
    });

    const category = response.text?.trim() || "No response";
    console.log("🤖 AI result:", category);
    //speakText(category); //calling the text-to-speech
    return category;
  } catch (error) {
    console.error("Cohere API error:", error);
    return "Unable to determine category.";
  }
}
