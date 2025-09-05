import ErrorBoundary from '@/components/ui/error-boundary'
import ArticleList from '@/components/ui/article-list'
import ArticleModal from '@/components/ui/article-modal'
import type { Article } from '@/lib/types'
import { useState, useEffect } from 'react'

export function PageClient({ initialArticles = [] }: { initialArticles?: Article[] }) {
  'use client'
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Article | null>(null)

  useEffect(() => {
    if (initialArticles.length > 0) {
      setArticles(initialArticles);
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const res = await fetch('http://localhost:3000/api/rss?url=https://ai-news.dev/feeds/')
        if (res.ok) {
          const data = await res.json()
          setArticles(data.items || [])
        }
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [initialArticles])

  return (
    <>
      <ArticleList articles={articles} isLoading={loading} onSelect={setSelected} />
      {selected && <ArticleModal article={selected} onClose={() => setSelected(null)} />}
    </>
  )
}

export default function Page() {
  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">RSS Reader</h1>
      <ErrorBoundary>
        <PageClient />
      </ErrorBoundary>
    </main>
  )
}
