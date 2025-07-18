
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  try {
    const userMessage = req.body.message || "مرحبا";
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: userMessage }]
    });

    const reply = completion.data.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    console.error("❌ GPT ERROR:", error.response?.data || error.message);
    res.status(500).json({ reply: "حصل خطأ داخلي أثناء التواصل مع GPT." });
  }
};
