'use client'

import type { Article } from '@/lib/types'
import ArticleDetail from './article-detail'
import { Button } from './button'
import { ScrollArea } from './scroll-area'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface Props {
  article: Article
  onClose: () => void
}

export default function ArticleModal({ article, onClose }: Props) {
  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{article.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <ScrollArea className="max-h-[70vh]">
            <ArticleDetail article={article} />
          </ScrollArea>
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="secondary" size="sm" onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
