export interface Article {
  title: string
  link: string
  pubDate: string
  content?: string
}

export interface RSSResponse {
  items: Article[]
}
