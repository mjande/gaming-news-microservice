import express, { Application, Request, Response } from "express";
import "dotenv/config";

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/articles", async (req: Request, res: Response) => {
  const limit = req.query.limit?.toString();
  const date = req.query.limit?.toString();

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("Error: GameSpot API key is incorrect");
  }

  const searchParams = new URLSearchParams({
    format: "json",
    limit: limit ?? "100",
    date: date ?? new Date().toISOString(),
    api_key: apiKey,
  });

  console.log(searchParams.toString());

  const result = await fetch(
    "http://www.gamespot.com/api/articles?" + searchParams.toString()
  );
  const data = await result.json();
  res.send(data);
});

// Listen on provided port
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
