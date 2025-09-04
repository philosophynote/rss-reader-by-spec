import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ArticleList from '../../components/ui/article-list'

describe('ArticleList integration', () => {
  it('renders titles from feed', () => {
    const articles = [
      { title: 'Test Article', link: '#', pubDate: '2024-01-01', content: 'content' }
    ]
    render(<ArticleList articles={articles} />)
    expect(screen.getByText('Test Article')).toBeInTheDocument()
  })
})
