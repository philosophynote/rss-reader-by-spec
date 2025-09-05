"use client"
import ErrorBoundary from '@/components/ui/error-boundary'
import ArticleList from '@/components/ui/article-list'
import ArticleModal from '@/components/ui/article-modal'
import type { Article } from '@/lib/types'
import { useEffect, useState } from 'react'

export default function PageClient({ initialArticles }: { initialArticles?: Article[] }) {
  const [articles, setArticles] = useState<Article[]>(initialArticles ?? [])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Article | null>(null)

  useEffect(() => {
    if (initialArticles && initialArticles.length > 0) {
      setArticles(initialArticles)
      setLoading(false)
      return
    }

    async function load() {
      try {
        const res = await fetch('/api/rss?url=https://ai-news.dev/feeds/')
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
    <ErrorBoundary>
      <ArticleList articles={articles} isLoading={loading} onSelect={setSelected} />
      {selected && <ArticleModal article={selected} onClose={() => setSelected(null)} />}
    </ErrorBoundary>
  )
}

