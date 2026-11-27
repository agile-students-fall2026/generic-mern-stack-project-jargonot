import app from "./app.mjs";
import "dotenv/config";
import { initializeArticles } from "./articles-data.mjs";
import { selectFavorites } from "./routes/favorite.mjs";
import connectDB from "./config/database.mjs";
const PORT = process.env.PORT || 3001;

try {
  await connectDB();
  await initializeArticles();

  selectFavorites();
  app.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("Backend startup failed:", err.message);
  process.exit(1);
}
