# Quickstart: シンプルなRSSリーダー

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Modern web browser

## Setup

```bash
# Clone repository and navigate to project
cd rss-reader-by-spec

# Install dependencies
npm install

# Initialize shadcn/ui (if not already done)
npx shadcn-ui@latest init

# Install required shadcn/ui components
npx shadcn-ui@latest add card button scroll-area separator

# Install RSS parser
npm install rss-parser
npm install --save-dev @types/rss-parser

# Start development server
npm run dev
```

## Verification Tests

### 1. RSS Feed Fetching Test
```bash
# Should return JSON with articles array
curl http://localhost:3000/api/rss
```

Expected response structure:
```json
{
  "title": "AI News",
  "description": "...",
  "link": "https://ai-news.dev",
  "lastBuildDate": "2025-09-04T...",
  "articles": [
    {
      "id": "unique-id",
      "title": "Article Title",
      "content": "Article content...",
      "link": "https://example.com/article",
      "publishedAt": "2025-09-04T...",
      "author": "Author Name",
      "imageUrl": "https://example.com/image.jpg"
    }
  ]
}
```

### 2. UI Rendering Test
1. Open http://localhost:3000
2. Verify articles list loads within 3 seconds
3. Verify articles display: title, date, author, excerpt
4. Click an article to verify details view
5. Verify responsive design on mobile/tablet

### 3. Error Handling Test
1. Disconnect internet connection
2. Refresh page
3. Verify error message displays: "Unable to load RSS feed. Please check your connection."
4. Reconnect and verify automatic retry works

## User Acceptance Validation

### Primary User Story Validation
- [ ] User opens application
- [ ] ai-news.dev feed loads automatically within 3 seconds
- [ ] Articles display in simple, readable format
- [ ] User can click any article to view details
- [ ] Article details load in readable format

### Feature Requirements Validation
- [ ] **FR-001**: RSS feed fetches from https://ai-news.dev/feeds/
- [ ] **FR-002**: Articles display in clean list format
- [ ] **FR-003**: Title, date, and excerpt visible for each article
- [ ] **FR-004**: Article detail view works on click
- [ ] **FR-005**: Page refresh fetches latest RSS data

## Performance Targets
- RSS feed fetch: < 3 seconds
- UI render after data load: < 1 second
- Article list scroll: 60fps smooth scrolling
- Memory usage: < 50MB for 100 articles

## Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+