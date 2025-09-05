'use client'

import type { Article } from '@/lib/types'
import ArticleDetail from './article-detail'

interface Props {
  article: Article
  onClose: () => void
}

export default function ArticleModal({ article, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white max-w-2xl w-full rounded p-4 sm:p-6 overflow-y-auto">
        <button
          onClick={onClose}
          className="mb-4 text-sm text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
        <ArticleDetail article={article} />
      </div>
    </div>
  )
}
