
// gemini code ------>

import genAI from "../../config/geminiConfig.js";
import { generateEmbedding } from "../utils/generateEmbedding.js";
import index from "../../config/pineconeConfig.js";
import pdfParse from "pdf-parse";

export async function uploadPolicy(req, res) {
  try {
    const pdfText = (await pdfParse(req.file.buffer)).text;
    const embedding = await generateEmbedding(pdfText);

    await index.upsert([{ id: req.file.originalname, values: embedding, metadata: { text: pdfText } }]);

    res.json({ message: "Policy uploaded & stored successfully!" });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Error uploading policy." });
  }
}

/** 🔍 Query Policy & Highlight Key Details */
export async function queryPolicy(req, res) {
  try {
    const { question } = req.body;
    const queryEmbedding = await generateEmbedding(question);

    // Retrieve policy clauses
    const results = await index.query({ vector: queryEmbedding, topK: 3, includeMetadata: true });
    const clauses = results.matches.map(match => match.metadata.text).join("\n");

    // Generate insights with Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    const prompt = `You are an Indian personal finance expert, ex-CEO of India's biggest insurance companies who now exposes hidden terms in policies to help customers.
    
    Here is an insurance policy document:
    ${clauses}
    
    Analyze it carefully and provide insights based on the following:  
    1️⃣ Hidden clauses that could lead to claim rejection  
    2️⃣ Unnecessary features designed to extract more premium  
    3️⃣ Exclusions or fine print that customers often overlook  
    4️⃣ Any misleading benefits or missing crucial details  

    Explain clearly and highlight all risks in simple terms.`;

    const response = await model.generateContent(prompt);
    const insights = response.response.candidates[0].content.parts[0].text;

    res.json({ insights });
  } catch (error) {
    console.error("Query Error:", error);
    res.status(500).json({ error: "Error processing query." });
  }
}

export async function analyzePolicy(req, res) {
  try {
    const pdfText = (await pdfParse(req.file.buffer)).text;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    // ✅ Improved prompt to prevent hallucinations
    const response = await model.generateContent([
      `You are an expert in analyzing insurance policies. Carefully analyze the following document and return a **strictly valid JSON object** with information extracted **only from the provided text**.

      - **Policy Type Detection:** Identify whether this document is for health, life, home, motor, travel, or another type of insurance. **Do NOT guess**—use only the words found in the document. If unclear, return "unknown".
      - **Structured Output:** Extract information into the following JSON format:

      {
        "policy_type": "Extracted policy type from the document (do not assume).",
        "key_insights": "Short summary of the key highlights from this insurance policy.",
        "hidden_clauses": ["Any hidden terms or conditions that could impact the policyholder."],
        "exclusions": ["List of exclusions that this specific policy does not cover."],
        "waiting_periods": ["Any specified waiting periods before claims can be made (if applicable)."],
        "misleading_benefits": ["Policy benefits that might seem attractive but have limitations or fine print."],
        "recommendations": ["Clear, actionable advice based on the actual policy text."]
      }

      **IMPORTANT RULES:**
      - Extract data **only from the document text**. Do **not** add general insurance knowledge.
      - If the document does **not explicitly mention the policy type**, return "unknown" instead of guessing.
      - Ensure the response is **pure JSON**, without additional explanations or formatting.
      - If a category is missing in the document, return an empty array (e.g., "waiting_periods": []).`
    ]);

    // ✅ Extract response text
    const jsonResponse = response.response?.candidates?.[0]?.content?.parts?.[0]?.text.trim();

    // ✅ Remove unwanted Markdown formatting if present
    const cleanedJson = jsonResponse.replace(/^```json/, "").replace(/```$/, "").trim();

    // ✅ Parse the JSON safely
    let parsedData;
    try {
      parsedData = JSON.parse(cleanedJson);
    } catch (error) {
      console.error("JSON Parsing Error:", error.message);
      throw new Error("Gemini API did not return valid JSON.");
    }

    res.json(parsedData);
  } catch (error) {
    console.error("Analysis Error:", error.message);
    res.status(500).json({ error: "Error analyzing policy.", details: error.message });
  }
}




