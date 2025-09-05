import { describe, it, expect, vi } from 'vitest'
import * as parser from '../../lib/rss-parser'
import { GET } from '../../app/api/rss/route'

const request = new Request('http://localhost:3000/api/rss?url=https://ai-news.dev/feeds/')

describe('RSS API circuit breaker', () => {
  it('returns 503 after repeated failures', async () => {
    const spy = vi.spyOn(parser, 'parseRss').mockRejectedValue(new Error('fail'))
    for (let i = 0; i < 3; i++) {
      await GET(request)
    }
    const res = await GET(request)
    expect(res.status).toBe(503)
    spy.mockRestore()
  })
})
