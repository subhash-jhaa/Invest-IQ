import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// Specify the model name correctly
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Generates investment suggestions using Gemini AI based on user profile data
 * @param {Object} userProfile - User profile data
 * @returns {Promise<Object>} - AI-generated investment suggestions
 */
export async function generateInvestmentSuggestion(userProfile) {
  try {
    const prompt = `
      As an AI investment advisor, analyze this investor profile and provide personalized recommendations:
      
      Age: ${userProfile.age || "N/A"}
      Monthly Investment: ${userProfile.monthlyInvestment || "N/A"}
      Initial Investment: ${userProfile.initialInvestment || "N/A"}
      Investment Goal: ${userProfile.investmentGoal || "N/A"}
      Investment Period: ${userProfile.investmentPeriod || "N/A"} years
      Risk Tolerance: ${userProfile.riskTolerance || "Moderate"}
      
      Based on this profile:
      1. Determine the most appropriate risk profile (choose exactly one from: "Conservative", "Moderate", or "Aggressive")
      2. Suggest 3-5 investment types (e.g., SIP, Gold, Balanced Mutual Fund, Index Funds, etc.)
      
      Return your response as a JSON object with this exact format:
      { 
        "riskProfile": "one of Conservative/Moderate/Aggressive", 
        "investmentType": ["type1", "type2", "type3"]
      }
      Return only the JSON, no other text.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Extract the JSON object from the response text
    // Sometimes the API returns the JSON with extra text, so we need to parse it
    let jsonResponse;
    try {
      // First try to parse the entire response as JSON
      jsonResponse = JSON.parse(responseText);
    } catch (error) {
      // If that fails, try to extract JSON using regex
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse JSON from response");
      }
    }

    return {
      success: true,
      data: jsonResponse,
    };
  } catch (error) {
    console.error("Error generating investment suggestion:", error);
    return {
      success: false,
      error: error.message,
      // Fallback data in case of failure
      data: {
        riskProfile: "Moderate",
        investmentType: ["SIP", "Mutual Funds", "Index Funds"],
      },
    };
  }
}

/**
 * Explains an investment term in simple language for beginners
 * @param {string} term - The investment term to explain
 * @returns {Promise<Object>} - Simple explanation of the term
 */
export async function explainLike18(term) {
  try {
    const prompt = `
You are a friendly financial educator explaining concepts to an 18-year-old who is completely new to investing.

📘 Your task is to explain the following investment-related term in a **very simple, friendly, and relatable way**:
- Term: "${term}"

📌 Instructions:
- Use **2 to 3 short sentences** only.
- Use analogies, comparisons, or examples a teenager can understand.
- Avoid technical jargon, definitions, or complicated explanations.
- Never assume prior knowledge of finance.
- Be warm, clear, and engaging like a mentor.

🎯 Format:
Just return the explanation. Do NOT prefix with "Here's the explanation" or anything similar.

Now explain "${term}" to an 18-year-old beginner:
`;

    const result = await model.generateContent(prompt);
    const explanation = result.response.text();

    return {
      success: true,
      explanation,
    };
  } catch (error) {
    console.error("Error explaining term:", error);
    // Create a more helpful error message that includes API details
    const errorMessage = `Explanation failed: ${error.message}. 
      This might be due to API changes or quota limits. 
      You can try again later or check the Gemini API documentation for updates.`;

    return {
      success: false,
      error: errorMessage,
      explanation: `Sorry, I couldn't explain "${term}" right now. The AI explanation service is temporarily unavailable.`,
    };
  }
}

/**
 * Handles chatbot-like conversation strictly about investment-related questions
 * @param {string} userMessage - The user's question or message
 * @returns {Promise<Object>} - The assistant's reply
 */
export async function investmentChatBot(messages) {
  try {
    const intro = `
You are **InvestIQ AI**, the official AI Chat Assistant of **InvestIQ** — a financial education and investment advisory platform for beginners in India.

🧠 Your role is to assist users in a **simple, beginner-friendly** way. Keep all responses:
- Clear and jargon-free
- Friendly and supportive
- Short and structured unless asked for details

💼 You are only allowed to answer topics like:
- SIPs (Systematic Investment Plans)
- Mutual Funds
- Fixed Deposits
- Investment Goals
- Portfolio Planning
- Tax-saving investments (e.g., ELSS)
- Index funds, ETFs, Gold
- Risk tolerance basics
- How to start investing
- Common investment terms (NAV, CAGR, corpus, etc.)

🚫 Do NOT answer questions about politics, science, personal issues, or anything unrelated to investing. If asked, politely say:
> “I'm here to help with investment and finance topics only through InvestIQ 😊. Ask me anything about investing!”

💬 Additional Guidelines:
- Use relatable analogies (e.g., “SIP is like a monthly piggy bank for your future.”)
- Always assume the user is new to finance
- Wait for users to ask questions — do not give unsolicited explanations

Below is the conversation so far:
`;

    const conversation = messages
      .map(
        (msg) => `${msg.role === "user" ? "User" : "InvestIQ AI"}: ${msg.text}`
      )
      .join("\n");

    const prompt = `${intro}\n${conversation}\n\nInvestIQ AI:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return {
      success: true,
      reply: response.text().trim(),
    };
  } catch (error) {
    console.error("Chatbot error:", error);
    return {
      success: false,
      reply:
        "Sorry, I'm currently unable to respond. Please try again shortly.",
    };
  }
}

/**
 * Generates an in-depth explanation of a blog topic (title + summary)
 * @param {string} title - Blog title
 * @param {string} summary - Blog summary
 * @returns {Promise<{success: boolean, explanation: string}>}
 */
export async function blogBrainExplain(title, summary) {
  try {
    const prompt = `
You are **InvestIQ AI 🧠**, a friendly and expert financial guide built for beginners in India.

Your task is to write a blog-style explanation in **Markdown format** for the following blog:

---
📌 **Title**: "${title}"  
📝 **Summary**: "${summary}"
---

### ✅ Formatting Instructions:

Write a **detailed, beginner-friendly blog** post that explains the topic simply, step-by-step. Use the following format:

---

## 🧩 Introduction  
Start by explaining what the topic is and why it's important.

## 🔍 Simple Explanation  
Break the topic down into 3–5 short paragraphs using everyday language. If any questions are naturally asked in the explanation, **bold them**.

## 🧠 Real-Life Analogy  
Use an easy-to-understand example or analogy — something relatable like shopping, cooking, school, etc.

## ✨ Quick Tips to Remember  
Use bullet points to highlight 3–5 things a beginner should take away.

---

### ✨ Additional Instructions:

- Your response should be **at least 15-18 full sentences**
- Do **not** use financial jargon unless you explain it simply
- Do **not** say "As an AI..." or mention being an assistant
- Keep your tone warm, motivating, and easy-going — like teaching a friend
- Use **line breaks** between paragraphs and lists for better readability
- Output **only the blog** in Markdown (no extra commentary)

🧠 Begin your full blog response now:
`;

    const result = await model.generateContent(prompt);
    const explanation = result.response.text();

    return {
      success: true,
      explanation: explanation.trim(),
    };
  } catch (error) {
    console.error("Error in blogBrainExplain:", error);
    return {
      success: false,
      explanation: `Sorry, I couldn't explain "${title}" right now.`,
    };
  }
}
