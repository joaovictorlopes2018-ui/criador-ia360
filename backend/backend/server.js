import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const { description } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer SUA_API_KEY_AQUI`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Você gera projetos de apps em JSON." },
          { role: "user", content: description }
        ],
        temperature: 0.2
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Erro ao gerar app" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
