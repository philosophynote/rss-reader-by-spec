'use client'

import type { Article } from '@/lib/types'
import ArticleDetail from './article-detail'
import { Card, CardContent } from './card'
import { Button } from './button'
import { ScrollArea } from './scroll-area'

interface Props {
  article: Article
  onClose: () => void
}

export default function ArticleModal({ article, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-4 sm:p-6">
          <div className="mb-4">
            <Button onClick={onClose} className="text-sm">Close</Button>
          </div>
          <ScrollArea className="max-h-[70vh]">
            <ArticleDetail article={article} />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
