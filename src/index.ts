import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Listen on provided port
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
