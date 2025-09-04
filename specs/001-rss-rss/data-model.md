# Data Model: シンプルなRSSリーダー

## Article Entity

```typescript
interface Article {
  id: string;           // Unique identifier (generated from link + guid)
  title: string;        // Article title from RSS <title>
  content: string;      // Article content/description from RSS <description>
  link: string;         // Original article URL from RSS <link>
  publishedAt: Date;    // Publication date from RSS <pubDate>
  author?: string;      // Author name from RSS <author> (optional)
  imageUrl?: string;    // Featured image from RSS <enclosure> or <media:thumbnail> (optional)
}
```

### Validation Rules

- **id**: Must be non-empty string, generated as hash of `link + guid`
- **title**: Required, max 200 characters, HTML tags stripped
- **content**: Required, max 2000 characters, HTML allowed but sanitized
- **link**: Required, must be valid URL format
- **publishedAt**: Required, must be valid Date object
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
  lastBuildDate: Date; // Last update time
  articles: Article[]; // Array of articles
}
```

### Data Flow

```
RSS XML → rss-parser → RSSResponse → Article[] → React State → UI Components
```

No persistent storage - all data is ephemeral and refreshed on each page load.