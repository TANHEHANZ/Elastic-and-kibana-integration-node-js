import express from "express";
import { PORT } from "./config.js";
import { CreateInidce, Insert, Search } from "./lib/index.js";

const app = express();

app.get("/", (req, res) => {
  res.send("¡Hola Mundo con Node.js y Express!");
});

app.get("/test", async (req, res) => {
  const data = {
    provincia: "Cochabamba",
    fecha: new Date(),
  };

  try {
    await CreateInidce("provincias");

    const insertResult = await Insert("provincias", data);

    const searchResult = await Search("provincias", {
      provincia: "Cochabamba",
    });

    res.json({
      insertResult,
      searchResult: searchResult.hits.hits,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
