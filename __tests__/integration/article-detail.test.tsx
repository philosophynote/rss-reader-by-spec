import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ArticleDetail from '../../components/ui/article-detail'

describe('ArticleDetail integration', () => {
  it('displays article content', () => {
    const article = { title: 'Test', content: 'Hello world', link: '#', pubDate: '2024-01-01' }
    render(<ArticleDetail article={article} />)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })
})
