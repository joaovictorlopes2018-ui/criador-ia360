import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Criador IA 360 backend ativo" });
});

app.post("/generate", async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: "Descrição é obrigatória" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Você gera projetos de apps em JSON." },
          { role: "user", content: description }
        ],
        temperature: 0.2,
        max_tokens: 2000
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao gerar app" });
  }
});

export default app;
    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Erro ao gerar app" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
