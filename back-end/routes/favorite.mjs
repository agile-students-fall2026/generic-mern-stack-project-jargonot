import { Router } from "express";
import { getArticles } from "../articles-data.mjs";


const router = Router();

const favoriteIds = new Set();
let recommendation = null;

/* 
temporary implementation for selecting the first two articles as favorites, 
will not necessary when database is added
*/
export function selectFavorites() {
  favoriteIds.clear();
  const articles = getArticles();
  articles.slice(0, 2).forEach((a) => favoriteIds.add(String(a.id)));
  recommendation = recommendArticle();
}

/*
recommend a non-favorited article from favorited topics
*/
export function recommendArticle() {
  const articles = getArticles();

  const favorites = articles.filter((a) => favoriteIds.has(String(a.id)));
  const topics = [...new Set(favorites.map((a) => a.topic))];
  if (topics.length === 0) return null;

  const topic = topics[Math.floor(Math.random() * topics.length)];

  return (
    articles.find(
      (a) => a.topic === topic && !favoriteIds.has(String(a.id))
    ) ?? null
  );
}

export function getRecommendation() {
  recommendation.isFavorite = false;
  return recommendation;
}

/* 
at the moment, it is excessive computation, but when the favoirtes aren't directly next to 
each other in the articles data, it will be necessary to filter through all articles to find the favorites.
*/
const listFavorites = () => {
  const articles = getArticles();
  const favorites = articles.filter((a) => favoriteIds.has(String(a.id)));
  favorites.forEach((a) => (a.isFavorite = true));
  return favorites
};

router.get("/", (_req, res) => {
  res.json({ data: listFavorites() });
});

router.get("/recommended", (_req, res) => {
  const article = getRecommendation();
  if (!article) {
    return res.status(404).json({ error: "No unfavourited articles left" });
  }
  res.json({ data: article });
});

router.delete("/:articleId", (req, res) => {
  const { articleId } = req.params;

  if (!favoriteIds.has(articleId)) {
    return res.status(404).json({ error: "Favourite not found" });
  }

  favoriteIds.delete(articleId);
  recommendation = recommendArticle();
  res.json({ data: listFavorites() });
});

export default router;