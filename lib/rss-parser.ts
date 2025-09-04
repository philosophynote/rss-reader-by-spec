import Parser from 'rss-parser'
import type { RSSResponse, Article } from './types'

const parser = new Parser()

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 3,
  timeoutMs = 5000
): Promise<Response> {
  let attempt = 0
  let lastError: any

  while (attempt < retries) {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const res = await fetch(url, { ...options, signal: controller.signal })
      clearTimeout(id)
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }
      return res
    } catch (err) {
      lastError = err
      clearTimeout(id)
      attempt++
      if (attempt >= retries) break
      const backoff = Math.pow(2, attempt) * 100
      await new Promise((r) => setTimeout(r, backoff))
    }
  }
  throw lastError
}

export async function parseRss(url: string): Promise<RSSResponse> {
  const response = await fetchWithRetry(url)
  const text = await response.text()
  const feed = await parser.parseString(text)
  const items: Article[] = (feed.items || []).map((item) => ({
    title: item.title || '',
    link: item.link || '',
    pubDate: item.pubDate || '',
    content: (item as any).content || (item as any)['content:encoded'] || ''
  }))
  return { items }
}
