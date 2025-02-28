import genAI from "../../config/geminiConfig.js";

export async function generateEmbedding(text) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

  const response = await model.generateContent(`Convert this text into a vector embedding: ${text}`);
  const embeddingText = response.response.candidates[0].content.parts[0].text;

  // Convert response text into an array of floats (simple workaround)
  const embedding = embeddingText.split(",").map(Number);

  return embedding;
}
