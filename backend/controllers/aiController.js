import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const askAI = async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a smart finance assistant helping users manage expenses and savings.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

     res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};