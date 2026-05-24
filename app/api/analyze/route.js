export async function POST(request) {
  try {
    console.log("GROQ API Key exists:", !!process.env.GROQ_API_KEY);

    const { problem, category } = await request.json();

    const prompt = `You are an expert in Indian consumer rights law with deep knowledge of the Consumer Protection Act 2019, RBI regulations, IRDAI rules, RERA, and all sector-specific grievance portals.

A user has been cheated or treated unfairly. Analyze their situation and respond ONLY in this exact JSON format:

{
  "violation": "Name of the legal violation that occurred",
  "law": "Specific law or regulation that protects them",
  "severity": "High",
  "immediate_steps": ["step 1", "step 2", "step 3"],
  "portal": {
    "name": "Name of the grievance portal",
    "url": "https://consumerhelpline.gov.in",
    "timeline": "how long resolution typically takes"
  },
  "complaint_letter": "Full ready-to-send complaint letter addressed to the right authority"
}

Category: ${category}
User problem: ${problem}

Respond with valid JSON only. No explanation outside the JSON.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are an Indian consumer rights expert. Always respond with valid JSON only."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0,
        max_tokens: 1500
      })
    });

    const data = await response.json();
    console.log("Groq response status:", response.status);

    if (!response.ok) throw new Error(data.error?.message || "Groq API error");

    const text = data.choices[0].message.content;
    console.log("Raw text:", text.slice(0, 100));

    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return Response.json({ success: true, data: parsed });

  } catch (error) {
    console.error("Full error:", error.message);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}