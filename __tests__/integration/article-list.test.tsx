import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ArticleList from '../../components/ui/article-list'

function makeArticles(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    title: `Article ${i + 1}`,
    link: '#',
    pubDate: '2024-01-01',
    content: 'content'
  }))
}

describe('ArticleList integration', () => {
  it('renders titles from feed', () => {
    const articles = makeArticles(1)
    render(<ArticleList articles={articles} />)
    expect(screen.getByText('Article 1')).toBeInTheDocument()
  })

  it('shows loading state when loading', () => {
    render(<ArticleList articles={[]} isLoading />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('paginates articles and loads more', () => {
    const articles = makeArticles(15)
    render(<ArticleList articles={articles} />)
    expect(screen.queryByText('Article 11')).not.toBeInTheDocument()
    const btn = screen.getByRole('button', { name: /load more/i })
    fireEvent.click(btn)
    expect(screen.getByText('Article 15')).toBeInTheDocument()
  })
})
