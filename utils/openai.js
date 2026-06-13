import "dotenv/config";

const getOpenAIAPIResponse = async (messages) => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

          // Optional headers recommended by OpenRouter
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "DevAi",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b:free",

          messages,

          temperature: 0.7,
          max_tokens: 1000,
        }),
      },
    );

    const data = await response.json();

    console.log("OpenRouter Response:", data);

    if (!response.ok) {
      throw new Error(
        data.error?.message || "Failed to get response from OpenRouter",
      );
    }

    return data.choices[0].message.content;
  } catch (err) {
    console.error("OpenRouter Error:", err.message);
    return null;
  }
};

export default getOpenAIAPIResponse;
