'use client'

import * as React from 'react'
import type { Article } from '@/lib/types'
import ArticleCard from './article-card'
import { Button } from './button'

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
        <Button
          className="col-span-full"
          onClick={() => setVisible((v) => v + 10)}
        >
          Load more
        </Button>
      )}
    </div>
  )
}
