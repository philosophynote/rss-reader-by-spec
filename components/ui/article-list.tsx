import * as React from 'react'
import type { Article } from '@/lib/types'
import ArticleCard from './article-card'

interface Props {
  articles: Article[]
  onSelect?: (article: Article) => void
}

export default function ArticleList({ articles, onSelect }: Props) {
  return (
    <div className="space-y-4">
      {articles.map((article, idx) => (
        <div key={idx} onClick={() => onSelect?.(article)}>
          <ArticleCard article={article} />
        </div>
      ))}
    </div>
  )
}
