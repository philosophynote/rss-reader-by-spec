import { describe, it, expect } from 'vitest'
import { parseRss } from '../../lib/rss-parser'

describe('RSS parser', () => {
  it('parses feed into articles', async () => {
    const feed = await parseRss('https://ai-news.dev/feeds/')
    expect(feed.items.length).toBeGreaterThan(0)
  })
})
