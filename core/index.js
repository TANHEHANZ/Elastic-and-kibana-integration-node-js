import express from "express";
import fs from "fs";
import path from "path";
import { PORT } from "./config.js";
import { CreateInidce, Insert, Search } from "./lib/index.js";
const app = express();
app.use(express.json());

const logsFile = path.join(process.cwd(), "logs.json");
app.get("/test", async (req, res) => {
  const data = { provincia: "Cochabamba", fecha: new Date() };
  try {
    await CreateInidce("provincias");
    const insertResult = await Insert("provincias", data);
    const searchResult = await Search("provincias", {
      provincia: "Cochabamba",
    });
    res.json({ insertResult, searchResult: searchResult.hits.hits });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
app.post("/logs", (req, res) => {
  const logEntry = {
    timestamp: new Date(),
    body: req.body,
  };

  let logs = [];
  if (fs.existsSync(logsFile)) {
    logs = JSON.parse(fs.readFileSync(logsFile, "utf8"));
  }

  logs.push(logEntry);
  fs.writeFileSync(logsFile, JSON.stringify(logs, null, 2));

  res.status(201).json({ message: "Log guardado" });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
