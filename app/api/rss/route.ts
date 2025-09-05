import { parseRss } from '@/lib/rss-parser'

const ALLOWED_HOSTS = ['ai-news.dev']
const FAILURE_THRESHOLD = 3
const OPEN_TIME = 60_000
let failures = 0
let circuitUntil = 0

function validateUrl(raw: string): URL | null {
  if (!raw || raw.length > 2048) return null
  try {
    const url = new URL(raw)
    if (!['http:', 'https:'].includes(url.protocol)) return null
    if (!ALLOWED_HOSTS.some((h) => url.hostname.endsWith(h))) {
      throw new Error('forbidden')
    }
    return url
  } catch (err) {
    if ((err as Error).message === 'forbidden') throw err
    return null
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const urlParam = searchParams.get('url')

  if (Date.now() < circuitUntil) {
    return new Response('Service temporarily unavailable', { status: 503 })
  }

  try {
    const url = validateUrl(urlParam || '')
    if (!url) {
      return new Response('Invalid URL', { status: 400 })
    }
    const feed = await parseRss(url.href)
    failures = 0
    return new Response(JSON.stringify(feed), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    if ((err as Error).message === 'forbidden') {
      return new Response('Forbidden domain', { status: 403 })
    }
    failures++
    if (failures >= FAILURE_THRESHOLD) {
      circuitUntil = Date.now() + OPEN_TIME
      failures = 0
      return new Response('Service temporarily unavailable', { status: 503 })
    }
    return new Response('Failed to fetch feed', { status: 500 })
  }
}
