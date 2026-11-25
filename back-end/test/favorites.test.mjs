import "dotenv/config";
import { expect } from "chai";
import request from "supertest";
import sinon from "sinon";
import axios from "axios";
import app from "../app.mjs";
import { initializeArticles } from "../articles-data.mjs";
import { selectFavorites } from "../routes/favorite.mjs";


// mock articles allow the testing of the favourites API without actual network requests
const MOCK_ARTICLES = [
  { id: 1, title: "Test one", topic: "Algorithms", publication: "J",
    thumbnailUrl: "https://example.com/1.jpg", keywords: ["k"], authors: ["A"],
    publishedDate: "2026-10-10", readingTimeMinutes: 5, abstract: "a",
    body: "b", jargon: [], dejargoned: { beginner: {}, intermediate: {} } },
  { id: 2, title: "Test two", topic: "Computer Vision", publication: "J",
    thumbnailUrl: "https://example.com/2.jpg", keywords: ["k"], authors: ["A"],
    publishedDate: "2026-06-17", readingTimeMinutes: 8, abstract: "a",
    body: "b", jargon: [], dejargoned: { beginner: {}, intermediate: {} } },
  { id: 3, title: "Test three", topic: "Algorithms", publication: "J",
    thumbnailUrl: "https://example.com/3.jpg", keywords: ["k"], authors: ["A"],
    publishedDate: "2026-01-01", readingTimeMinutes: 3, abstract: "a",
    body: "b", jargon: [], dejargoned: { beginner: {}, intermediate: {} } },
];

describe("Favourites API", () => {
  before(async () => {
    sinon.stub(axios, "get").resolves({ data: MOCK_ARTICLES });
    await initializeArticles();
    selectFavorites();
  });

  after(() => {
    sinon.restore();
  });

  describe("GET /api/favorites", () => {
    it("returns an array of favourite articles", async () => {
      const res = await request(app).get("/api/favorites");
      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.an("array");
      expect(res.body.data).to.have.length.greaterThan(0);
    });

    it("marks every returned article as a favourite", async () => {
      const res = await request(app).get("/api/favorites");
      res.body.data.forEach((a) => expect(a.isFavorite).to.equal(true));
    });
  });

  describe("GET /api/favorites/recommended", () => {
    it("returns a single article", async () => {
      const res = await request(app).get("/api/favorites/recommended");
      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.an("object");
      expect(res.body.data).to.have.property("id");
    });

    it("does not recommend an article already favourited", async () => {
      const favs = await request(app).get("/api/favorites");
      const rec = await request(app).get("/api/favorites/recommended");
      const favIds = favs.body.data.map((a) => String(a.id));
      expect(favIds).to.not.include(String(rec.body.data.id));
      expect(rec.body.data.isFavorite).to.equal(false);
    });

    it("returns the same article on repeated calls", async () => {
      const first = await request(app).get("/api/favorites/recommended");
      const second = await request(app).get("/api/favorites/recommended");
      expect(first.body.data.id).to.equal(second.body.data.id);
    });
  });

  describe("DELETE /api/favorites/:articleId", () => {
    it("404s for an article that is not a favourite", async () => {
      const res = await request(app).delete("/api/favorites/999999");
      expect(res.status).to.equal(404);
    });
    it("removes an existing favourite", async () => {
        const favs = await request(app).get("/api/favorites");
        const id = favs.body.data[0].id;
        const res = await request(app).delete(`/api/favorites/${id}`);
        expect(res.status).to.equal(200);
        });
  });
});