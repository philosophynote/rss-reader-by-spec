import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ErrorBoundary from '../../components/ui/error-boundary'

describe('Error handling', () => {
  it('renders fallback UI when child throws', () => {
    const Thrower = () => {
      throw new Error('fail')
    }
    render(
      <ErrorBoundary>
        <Thrower />
      </ErrorBoundary>
    )
    expect(screen.getByText(/failed to load/i)).toBeInTheDocument()
  })
})
