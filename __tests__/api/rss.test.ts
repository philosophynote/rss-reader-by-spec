import { describe, it, expect } from 'vitest'
import { GET } from '../../app/api/rss/route'

describe('GET /api/rss', () => {
  it('returns articles from RSS feed', async () => {
    const request = new Request('http://localhost:3000/api/rss?url=https://ai-news.dev/feeds/')
    const response = await GET(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(Array.isArray(data.items)).toBe(true)
  })
})
