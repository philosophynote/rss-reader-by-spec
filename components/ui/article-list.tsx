'use client'

import * as React from 'react'
import type { Article } from '@/lib/types'
import ArticleCard from './article-card'

interface Props {
  articles: Article[]
  onSelect?: (article: Article) => void
}

export default function ArticleList({ articles }: Props) {
  return (
    <div className="space-y-4">
      {articles.map((article, idx) => (
        <ArticleCard key={idx} article={article} />
      ))}
    </div>
  )
}
