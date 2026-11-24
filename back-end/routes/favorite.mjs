import { Router } from "express";
import { getArticles } from "../articles-data.mjs";


const router = Router();

const favoriteIds = new Set();

/* 
temporary implementation for selecting the first two articles as favorites, 
will not necessary when database is added
*/
export function selectFavorites() {
  favoriteIds.clear();
  const articles = getArticles();
  articles.slice(0, 2).forEach((a) => favoriteIds.add(String(a.id)));
}

/* 
at the moment, it is excessive computation, but when the favoirtes aren't directly next to 
each other in the articles data, it will be necessary to filter through all articles to find the favorites.
*/
const listFavorites = () => {
  const articles = getArticles();
  return articles.filter((a) => favoriteIds.has(String(a.id)));
};

router.get("/", (_req, res) => {
  res.json({ data: listFavorites() });
});

router.delete("/:articleId", (req, res) => {
  const { articleId } = req.params;

  if (!favoriteIds.has(articleId)) {
    return res.status(404).json({ error: "Favourite not found" });
  }

  favoriteIds.delete(articleId);
  res.json({ data: listFavorites() });
});

export default router;