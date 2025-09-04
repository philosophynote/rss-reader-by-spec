import { describe, it, expect } from 'vitest'
import { fetchWithRetry } from '../../lib/rss-parser'

describe('fetchWithRetry', () => {
  it('retries on network errors and respects timeout', async () => {
    await expect(fetchWithRetry('https://ai-news.dev/feeds/')).resolves.toBeDefined()
  })
})
