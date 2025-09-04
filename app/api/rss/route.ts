import { parseRss } from '@/lib/rss-parser'

const ALLOWED_HOSTS = ['ai-news.dev']

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
  try {
    const url = validateUrl(urlParam || '')
    if (!url) {
      return new Response('Invalid URL', { status: 400 })
    }
    const feed = await parseRss(url.href)
    return new Response(JSON.stringify(feed), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    if ((err as Error).message === 'forbidden') {
      return new Response('Forbidden domain', { status: 403 })
    }
    return new Response('Failed to fetch feed', { status: 500 })
  }
}
