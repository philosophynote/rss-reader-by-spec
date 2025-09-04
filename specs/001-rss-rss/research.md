# Research: シンプルなRSSリーダー

## RSS Parsing in Next.js

**Decision**: Use `rss-parser` npm package for RSS parsing
**Rationale**: 
- Lightweight (~15KB)
- Works in both Node.js and browser environments
- TypeScript support
- Simple API for parsing RSS/Atom feeds
- Active maintenance with 1M+ weekly downloads

**Alternatives considered**:
- `feedparser` - More complex, Node.js only
- `fast-xml-parser` - General XML parser, requires more setup
- Browser native `DOMParser` - Limited RSS-specific features

## UI Component Library Integration

**Decision**: Use shadcn/ui with Tailwind CSS
**Rationale**:
- Copy-paste components (no runtime dependency)
- Built on top of Radix UI primitives
- Excellent TypeScript support
- Customizable with CSS variables
- Active community and documentation

**Implementation approach**:
- Initialize with `npx shadcn-ui@latest init`
- Use components: Card, Button, ScrollArea, Separator
- Custom theme for clean, readable design

## CORS and RSS Feed Access

**Decision**: Use Next.js API Routes as proxy
**Rationale**:
- Bypass CORS restrictions when fetching from ai-news.dev
- Server-side parsing for better performance
- Cache control headers for optimization
- Error handling on server side
**Security**:
- Allowlist: `ai-news.dev` のみ
- Private IP/localhost/リンクローカル遮断、HTTPS限定、リダイレクト最大1回
- 5sタイムアウト、本文2MB上限、Content-Typeは`application/xml`,`text/xml`に限定

**Alternatives considered**:
- Direct browser fetch - Blocked by CORS
- CORS proxy services - External dependency, reliability issues
- Browser extension - Different deployment model

## Performance Optimization

**Decision**: Implement basic caching and pagination
**Rationale**:
- Cache RSS feed responses for 5 minutes
- Display first 20 articles initially
- Load more on demand
- Image lazy loading for thumbnails

## Error Handling Strategy

**Decision**: React Error Boundaries + user-friendly messages
**Rationale**:
- Graceful degradation when RSS feed is unavailable
- Clear error messages for network issues
- Retry mechanisms for temporary failures
- Loading states for better UX

**Implementation notes**:
- Server: `AbortController`で5sタイムアウト、再試行は指数バックオフ最大2回（GETのみ）
- Client: 429/5xxはユーザー通知＋再試行ボタン、4xxは説明文表示

## Testing Strategy

**Decision**: Vitest + React Testing Library + MSW for API mocking
**Rationale**:
- Component testing for UI interactions
- Integration testing for RSS parsing
- Mock Service Worker for reliable API testing
- Test actual RSS XML responses