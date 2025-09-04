import { describe, it, expect } from 'vitest'
import { GET } from '../../app/api/rss/route'

describe('GET /api/rss URL validation', () => {
  it('rejects non-http URLs', async () => {
    const request = new Request('http://localhost:3000/api/rss?url=file:///etc/passwd')
    const response = await GET(request)
    expect(response.status).toBe(400)
  })

  it('rejects disallowed domains', async () => {
    const request = new Request('http://localhost:3000/api/rss?url=http://malicious.com/feed')
    const response = await GET(request)
    expect(response.status).toBe(403)
  })
})
