import express from "express";

import articlesRouter from "./routes/articles.mjs";
import authRouter from "./routes/auth.mjs";
import favoritesRouter from "./routes/favorite.mjs";
const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Jargonot API is running" });
});

app.use("/api/articles", articlesRouter);
app.use("/api", authRouter);
app.use("/api/favorites", favoritesRouter);

export default app;
