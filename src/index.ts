import express, { Application, Request, Response } from "express";
import "dotenv/config";
import { ApiResponse, getDateRangeParam } from "./utils.js";

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/articles", async (req: Request, res: Response) => {
  // Extract parameters from request
  const { limit, date } = req.query;

  const limitParam = limit ? limit.toString() : "10";
  const dateParam = getDateRangeParam(3, date?.toString());

  // Get API key from environment variables
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("Error: GameSpot API key is incorrect");
  }

  // Build parameters for API request
  const searchParams = new URLSearchParams({
    format: "json",
    limit: limitParam,
    field_list: "title,deck,site_detail_url",
    filter: dateParam,
    sort: "publish_date:desc",
    api_key: apiKey,
  });
  const url = "http://www.gamespot.com/api/articles?" + searchParams.toString();

  // Get result
  console.log(`Fetching from '${url}'`);
  const result = await fetch(url);
  const data = (await result.json()) as ApiResponse;

  // Process JSON response into object with more user-friendly properties
  const articles = data.results.map((item) => {
    return {
      title: item.title,
      description: item.deck,
      url: item.site_detail_url,
    };
  });

  // Send response
  res.send(articles);
});

// Listen on provided port
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
