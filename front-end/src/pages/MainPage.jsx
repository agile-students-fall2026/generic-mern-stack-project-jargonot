import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchArticles } from "./mock_data";
export default function MainPage() {
  const userName = "Jon";
  const topics = ["topic1", "topic2"];
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetchArticles()
      .then((response) => {
        if (!cancelled) {
          setArticle(response.data[0]);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch article:", error);
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl font-bold text-purple-600">Jargonot</h2>
        <a
          className="font-semibold text-purple-600 hover:underline"
          href="/dashboard"
        >
          My Dashboard
        </a>
      </header>

      <main className="mx-auto w-full max-w-4xl px-6 py-10">
        <section className="mb-8">
          <h1 className="mb-1 text-3xl font-bold">Hi {userName}!</h1>
          <p className="text-gray-600">What do you want to learn today?</p>
        </section>

        <section className="mb-8">
          <label
            className="mb-2 block text-sm font-medium"
            htmlFor="search-input"
          >
            Search a topic or article&nbsp;
          </label>
          <input
            id="search-input"
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
            type="text"
            placeholder="Search for..."
          />
        </section>

        <section className="mb-10">
          <h3 className="mb-4 text-xl font-bold">Your Topics</h3>
          <div className="flex flex-wrap gap-3">
            {topics.map((topic) => (
              <button
                key={topic}
                className="rounded-lg border border-purple-200 px-4 py-2 font-medium text-purple-700 hover:bg-purple-50"
              >
                {topic}
              </button>
            ))}
            <button
              aria-label="Add topic"
              className="rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white hover:bg-purple-700"
            >
              +
            </button>
          </div>
        </section>

        <section className="mb-8">
          <h3 className="mb-4 text-xl font-bold">Today's Pick</h3>

          {loading ? (
            <p className="text-gray-600">Loading today's article...</p>
          ) : article ? (
            <article className="overflow-hidden rounded-lg border border-gray-200 md:flex">
              <div className="flex min-h-48 items-center justify-center bg-purple-50 md:w-1/3">
                <img
                  className="h-full w-full object-cover"
                  src={article.thumbnailUrl}
                  alt={article.title}
                />
              </div>

              <div className="p-6 md:flex-1">
                <p className="mb-2 text-sm text-gray-500">
                  {article.topic} | {article.publication} |{" "}
                  {article.readingTimeMinutes} min read
                </p>

                <h4 className="mb-2 text-lg font-bold">{article.title}</h4>

                <p className="mb-4 text-gray-600">{article.abstract}</p>

                <Link
                  to={`/articles/${article.id}`}
                  state={{ article: article }}
                  className="font-semibold text-purple-600 hover:underline"
                >
                  Read Article →
                </Link>
              </div>
            </article>
          ) : (
            <p className="text-gray-600">Today's article is unavailable.</p>
          )}
        </section>
        <a
          className="rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700"
          href="/articles"
        >
          Browse All Articles
        </a>
      </main>
    </div>
  );
}
