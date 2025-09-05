import * as React from 'react'
import type { Article } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from './card'

interface Props {
  article: Article
  className?: string
  onClick?: () => void
}

export default function ArticleCard({ article, className, onClick }: Props) {
  return (
    <Card
      className={cn('cursor-pointer', className)}
      onClick={onClick}
      role="article"
    >
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl text-blue-600 hover:text-blue-800">
          {article.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-4 pb-4 sm:px-6 sm:pb-6">
        <p className="text-sm text-gray-500">
          {new Date(article.pubDate).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  )
}
