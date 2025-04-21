
// Import to use fetch and possibly define types
export type VerificationResult = {
  isTrue: boolean | null;
  confidence: number;
  explanation: string;
  sources?: string[];
};

// Define the Gemini API endpoint
const GEMINI_API_URL = "https://api.perplexity.ai/chat/completions";

type GeminiResponse = {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
  }>;
};

// Helper to parse Gemini's response content and convert it into VerificationResult
const parseGeminiResponse = (content: string): VerificationResult => {
  // This parsing logic depends on how Gemini responds.
  // For demonstration, expect content as JSON string or a specific formatted string.
  // We'll try to parse JSON first, if fails fallback to a default unknown

  try {
    const parsed = JSON.parse(content);

    // Expected keys: isTrue, confidence, explanation, sources
    return {
      isTrue:
        typeof parsed.isTrue === "boolean"
          ? parsed.isTrue
          : parsed.isTrue === "true"
          ? true
          : parsed.isTrue === "false"
          ? false
          : null,
      confidence:
        typeof parsed.confidence === "number"
          ? parsed.confidence
          : 0.5,
      explanation:
        typeof parsed.explanation === "string"
          ? parsed.explanation
          : "",
      sources:
        Array.isArray(parsed.sources)
          ? parsed.sources
          : [],
    };
  } catch {
    // If no JSON, fallback to default: treat as unknown with explanation in content
    return {
      isTrue: null,
      confidence: 0.5,
      explanation: content,
      sources: [],
    };
  }
};

// Updated verifyText function that uses Gemini API
export const verifyText = async (
  text: string,
  apiKey: string
): Promise<VerificationResult> => {
  // Prepare the request body
  const requestBody = {
    model: "llama-3.1-sonar-small-128k-online",
    messages: [
      {
        role: "system",
        content:
          "You are a fact verification assistant. Reply strictly in JSON format with fields: isTrue (true/false/null), confidence (0 to 1), explanation (string), sources (array of URLs).",
      },
      {
        role: "user",
        content: `Verify the following claim for truthfulness and provide your response in the requested JSON format:\n${text}`,
      },
    ],
    temperature: 0.2,
    top_p: 0.9,
    max_tokens: 1000,
    return_images: false,
    return_related_questions: false,
    search_domain_filter: ["perplexity.ai"],
    search_recency_filter: "month",
    frequency_penalty: 1,
    presence_penalty: 0,
  };

  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Gemini API error: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  const data: GeminiResponse = await response.json();

  if (!data.choices || data.choices.length === 0) {
    throw new Error("Gemini API did not return any choices");
  }

  // Extract response text
  const content = data.choices[0].message.content;

  // Parse the response content to our VerificationResult type
  return parseGeminiResponse(content);
};
