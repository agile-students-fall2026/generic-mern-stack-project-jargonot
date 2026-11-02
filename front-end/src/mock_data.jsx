import axios from 'axios'

/* the hook for front-end paper data fetching.

the address of the mock API (+ our Mockaroo key) is in front-end/.env, so make a .env with the link + api key
.env itself if gitignored, will paste env in chat once pr is approved

Mockaroo schema:
id
title               article name
topic               one of: AI/ML, Cybersecurity, Algorithms, Computer Vision
publication         the journal or site it was published in
thumbnailUrl        a placeholder image from Picsum, e.g. https://picsum.photos/seed/7/300/200 # potentially can remove if no thumbnail is generally applicable
keywords            a list of words or phrases
authors             a list of names
publishedDate       e.g. 2026-03-14
readingTimeMinutes  e.g. 12
abstract            abstract, preview paragraph
body                the full original text
jargon              a list of {term, explanation} objects
dejargoned          {beginner, intermediate}, each with whatHappened, whyItMatters and goDeeper

caller uses .then() to wait for the request to finish, and the list of articles is then in response.data
App.jsx should call this only once and pass the articles to each page as a prop
*/

const fetchArticles = () => {
  const url = import.meta.env.VITE_ARTICLES_API_URL

  // validate env file
  if (!url) {
    return Promise.reject(
      new Error(
        'VITE_ARTICLES_API_URL is not set - copy front-end/.env.example to front-end/.env, fill it in with the API key, and restart npm run dev',
      ),
    )
  }

  console.log('fetching articles...')
  return axios(url)
}

const findArticleById = (articles, id) => {
  return articles.find(article => String(article.id) === String(id))
}

const searchArticles = (articles, searchTerm, searchBy) => {
  const term = (searchTerm || '').trim().toLowerCase()

  // empty search: match all articles
  if (term === '') {
    return articles
  }

  const matches = text => text.toLowerCase().includes(term)

  return articles.filter(article => {
    const titleMatches = matches(article.title)
    const topicMatches = matches(article.topic)
    const keywordMatches = article.keywords.some(keyword => matches(keyword))
    const jargonMatches = article.jargon.some(item => matches(item.term))

    if (searchBy === 'title') return titleMatches
    if (searchBy === 'topic') return topicMatches
    if (searchBy === 'keyword') return keywordMatches
    if (searchBy === 'jargon') return jargonMatches
    return titleMatches || topicMatches || keywordMatches || jargonMatches
  })
}

// importable functions
export {fetchArticles, findArticleById, searchArticles}
