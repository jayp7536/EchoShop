/*
- Takes OCR text as input
- Uses OpenAI to interpret it
- Returns the processed response to the server
*/

import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

export async function getMainCategory(text) {
  console.log("Analyzing OCR text with Cohere...");

  try {
    const response = await cohere.chat({
      model: "command-a-vision-07-2025",
      message: `Analyze this OCR text and identify the main idea or category of the sign.
        Focus on understanding what the sign represents (e.g., a section, aisle, or product type),
        not just copying exact words.

        Only output a short, clear label that summarizes the sign’s main idea,
        using only words from the sign when possible.

      Example: "chips, candy, crackers" -> "SNACK aisle"
      Example: "FOOD, spinach, bread, cheese" -> "FOOD aisle"
      Example: "MEAT and SEAFOOD Fresh Daily" -> "MEAT and SEAFOOD aisle"

      Here’s the OCR text:
      ${text}`,
    });

    const category = response.text?.trim() || "No response";
    console.log("🧠 AI result:", category);
    return category;
  } catch (error) {
    console.error("Cohere API error:", error);
    return "Unable to determine category.";
  }
}
