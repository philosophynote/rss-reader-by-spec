import ArticleList from '@/components/ui/article-list'
import ErrorBoundary from '@/components/ui/error-boundary'
import type { Article } from '@/lib/types'

async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch(
      'http://localhost:3000/api/rss?url=https://ai-news.dev/feeds/',
      { cache: 'no-store' }
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.items || []
  } catch {
    return []
  }
}

export default async function Page() {
  const articles = await getArticles()
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">RSS Reader</h1>
      <ErrorBoundary>
        <ArticleList articles={articles} />
      </ErrorBoundary>
    </main>
  )
}
