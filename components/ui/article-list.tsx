'use client'

import * as React from 'react'
import type { Article } from '@/lib/types'
import ArticleCard from './article-card'

interface Props {
  articles: Article[]
  isLoading?: boolean
  onSelect?: (article: Article) => void
}

export default function ArticleList({ articles, isLoading = false, onSelect }: Props) {
  const [visible, setVisible] = React.useState(10)

  if (isLoading && articles.length === 0) {
    return <div>Loading...</div>
  }

  const shown = articles.slice(0, visible)

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {shown.map((article, idx) => (
        <ArticleCard
          key={idx}
          article={article}
          onClick={() => onSelect?.(article)}
        />
      ))}
      {visible < articles.length && (
        <button
          className="col-span-full rounded bg-blue-500 px-4 py-2 text-white"
          onClick={() => setVisible((v) => v + 10)}
        >
          Load more
        </button>
      )}
    </div>
  )
}
