import { expect } from "chai";
import request from "supertest";
import sinon from "sinon";
import axios from "axios";
import app from "../app.mjs";
import { initializeArticles } from "../articles-data.mjs";

describe("Jargonot API", function () {
  const mockArticles = [
    { id: 1, title: "Machine Learning Research", topic: "Algorithms" },
    { id: 2, title: "Computer Vision Research", topic: "Computer Vision" },
    { id: 3, title: "Cybersecurity Research", topic: "Algorithms" },
  ];

  it("should return a successful health response", async function () {
    const res = await request(app).get("/api/health");

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("ok");
  });

  it("should return 503 when articles are not initialized", async function () {
    const res = await request(app).get("/api/articles");

    expect(res.status).to.equal(503);
    expect(res.body.error).to.equal("Articles are not available");
  });

  describe("After initializing articles", function () {
    let axiosStub;
    let originalKey;
    let originalUrl;

    before(async function () {
      originalKey = process.env.MOCKAROO_API_KEY;
      originalUrl = process.env.MOCKAROO_API_URL;

      process.env.MOCKAROO_API_KEY = "test-key";
      process.env.MOCKAROO_API_URL = "https://example.com/articles.json";

      axiosStub = sinon.stub(axios, "get").resolves({
        data: mockArticles,
      });

      await initializeArticles();
    });

    after(function () {
      axiosStub.restore();

      if (originalKey === undefined) {
        delete process.env.MOCKAROO_API_KEY;
      } else {
        process.env.MOCKAROO_API_KEY = originalKey;
      }

      if (originalUrl === undefined) {
        delete process.env.MOCKAROO_API_URL;
      } else {
        process.env.MOCKAROO_API_URL = originalUrl;
      }
    });

    it("should return cached articles successfully", async function () {
      const res = await request(app).get("/api/articles");

      expect(res.status).to.equal(200);
      expect(res.body.articles).to.deep.equal(mockArticles);
    });

    it("should retrieve an individual article by ID", async function () {
      const res = await request(app).get("/api/articles/2");

      expect(res.status).to.equal(200);
      expect(res.body.id).to.equal(2);
      expect(res.body.title).to.equal("Computer Vision Research");
    });

    it("should return 404 for an unknown article ID", async function () {
      const res = await request(app).get("/api/articles/999999");

      expect(res.status).to.equal(404);
      expect(res.body.error).to.equal("Article not found");
    });

    it("should return consistent articles on repeated requests", async function () {
      const first = await request(app).get("/api/articles");
      const second = await request(app).get("/api/articles");

      expect(first.body).to.deep.equal(second.body);
    });

    it("should fetch from Mockaroo only once", async function () {
      expect(axiosStub.calledOnce).to.equal(true);
      expect(axiosStub.firstCall.args[0]).to.equal(
        "https://example.com/articles.json"
      );
      expect(axiosStub.firstCall.args[1].params).to.deep.equal({
        key: "test-key",
      });
    });
  });
});
