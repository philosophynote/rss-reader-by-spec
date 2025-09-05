import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PageClient from '../../components/page-client'

const articles = [
  { title: 'Hello', link: '#', pubDate: '2024-01-01', content: 'Detail content' }
]

describe('Article detail modal', () => {
  it('opens modal on article click', () => {
    render(<PageClient initialArticles={articles} />)
    fireEvent.click(screen.getByText('Hello'))
    expect(screen.getByText('Detail content')).toBeInTheDocument()
  })
})
