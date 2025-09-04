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
    <div className={cn('rounded-lg border bg-white p-4 shadow-sm', className)}>
      <a 
        href={article.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="font-semibold text-lg text-blue-600 hover:text-blue-800"
      >
        {article.title}
      </a>
      <p className="text-sm text-gray-500 mt-2">
        {new Date(article.pubDate).toLocaleString()}
      </p>
    </div>
  )
}
