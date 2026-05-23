import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { problem, category } = await request.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are an expert in Indian consumer rights law with deep knowledge of 
the Consumer Protection Act 2019, RBI regulations, IRDAI rules, RERA, 
and all sector-specific grievance portals.

A user has been cheated or treated unfairly. Analyze their situation and respond ONLY in this exact JSON format:

{
  "violation": "Name of the legal violation that occurred",
  "law": "Specific law or regulation that protects them",
  "severity": "High / Medium / Low",
  "immediate_steps": ["step 1", "step 2", "step 3"],
  "portal": {
    "name": "Name of the grievance portal",
    "url": "actual URL",
    "timeline": "how long resolution typically takes"
  },
  "complaint_letter": "Full ready-to-send complaint letter addressed to the right authority"
}

Category: ${category}
User's problem: ${problem}

Respond with JSON only. No explanation outside the JSON.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Clean the response in case Gemini adds markdown
    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return Response.json({ success: true, data: parsed });

  } catch (error) {
    console.error("Error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}