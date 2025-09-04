# Data Model: シンプルなRSSリーダー

// Type alias for ISO datetime strings
type ISODateTimeString = string;

## Article Entity

```typescript
interface Article {
  id: string;           // Unique identifier (generated from link + guid)
  title: string;        // Article title from RSS <title>
  content: string;      // Article content/description from RSS <description>
  link: string;         // Original article URL from RSS <link>
  publishedAt: ISODateTimeString;    // Publication date from RSS <pubDate>
  author?: string;      // Author name from RSS <author> (optional)
  imageUrl?: string;    // Featured image from RSS <enclosure> or <media:thumbnail> (optional)
}
```

### Validation Rules

- **id**: 非空。`sha256(canonicalLink || guid || (title + publishedAt))` をBase64URLで表現。
  - canonicalLink: 末尾スラッシュ除去、クエリの順序正規化、`http→https`昇格を試行。
  - `guid`欠落時/非一意時のフォールバックを明示。
- **title**: 必須。最大200文字（書記素単位）。HTMLタグは除去し、HTMLエンティティはデコードする。
- **content**: 必須。最大2000文字（書記素単位）。許可するのは [a, p, ul, ol, li, strong, em, img, br] 等の限定的タグのみ。
  - 許可属性: `a[href rel target]`, `img[src alt width height loading]` など。`style`, `on*` は禁止。
  - 実装: DOMPurify（SSR/CSR双方）。`dangerouslySetInnerHTML`直前で必ず適用。
  - 画像は`next/image`を使用し、許可ドメインのみ（`next.config.js`の`images.remotePatterns`で制限）。
- **link**: Required, must be valid URL format
- **publishedAt**: Required, must be valid ISO datetime string
- **author**: Optional, max 100 characters if present
- **imageUrl**: Optional, must be valid URL format if present

### State Transitions

Articles are read-only data fetched from RSS feed:
1. **Fetched** → Initial state when loaded from RSS
2. **Displayed** → Rendered in UI list
3. **Viewed** → User clicked to view details (no persistence)

## RSS Feed Response

```typescript
interface RSSResponse {
  title: string;        // Feed title
  description: string;  // Feed description  
  link: string;        // Feed website URL
  lastBuildDate: ISODateTimeString; // Last update time
  articles: Article[]; // Array of articles
}
```

### Data Flow

```mermaid
RSS XML → rss-parser → RSSResponse → Article[] → React State → UI Components
```

No persistent storage - all data is ephemeral and refreshed on each page load.
