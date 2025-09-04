import * as React from 'react'
import type { Article } from '@/lib/types'
import { Card } from './card'
import { cn } from '@/lib/utils'

interface Props {
  article: Article
  className?: string
}

export default function ArticleCard({ article, className }: Props) {
  return (
    <Card className={cn('p-4', className)}>
      <a href={article.link} className="font-semibold text-lg">
        {article.title}
      </a>
      <p className="text-sm text-gray-500">{new Date(article.pubDate).toLocaleString()}</p>
    </Card>
  )
}
