import * as React from 'react'
import type { Article } from '@/lib/types'

interface Props {
  article: Article
}

export default function ArticleDetail({ article }: Props) {
  return (
    <article className="space-y-2 p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold">{article.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: article.content ?? '' }} />
      <a href={article.link} className="text-blue-500 underline">
        Read original
      </a>
    </article>
  )
}
