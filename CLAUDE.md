# CLAUDE.md

出力は日本語でお願いします。

## Project Overview
Next.js + TypeScript + shadcn/ui を使用したシンプルなRSSリーダー。ai-news.dev からRSSフィードを取得して読みやすい形で表示する。

## Technology Stack
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **UI Library**: shadcn/ui with Tailwind CSS
- **RSS Parsing**: rss-parser
- **Testing**: Vitest + React Testing Library + MSW

## Architecture
- フロントエンドのみのシンプルなアプリケーション
- Next.js API Routes でRSSフィード取得（CORS回避）
- データの永続化なし（ページリフレッシュで最新データ取得）
- コンポーネント構成: ArticleList, ArticleCard, ArticleDetail

## Current Implementation Status
- ✅ Specification complete
- ✅ Planning phase complete  
- ⏳ Task generation pending
- ⏳ Implementation pending

## Development Guidelines
- TDD approach: テストファースト、RED-GREEN-Refactor
- shadcn/uiコンポーネントを直接使用（ラッパーを作らない）
- シンプルな設計を維持（不要な抽象化を避ける）
- TypeScript strict mode使用

## Key Components to Implement
1. `/api/rss` - RSS feed proxy API
2. `ArticleList` - 記事一覧コンポーネント
3. `ArticleCard` - 個別記事カードコンポーネント  
4. `ArticleDetail` - 記事詳細表示コンポーネント
5. Error boundaries for graceful error handling

## Testing Strategy
- API routes: Contract tests with real RSS endpoint
- Components: Render tests with React Testing Library
- Integration: E2E user flow tests
- Performance: Loading time validation

## Commands
- `npm run dev` - 開発サーバー起動
- `npm run build` - 本番ビルド
- `npm run test` - Vitest テスト実行
- `npm run lint` - ESLint実行

## Important Instructions
- 既存ファイルの編集を優先し、新規ファイル作成は最小限に
- ドキュメントファイルは明示的に要求された場合のみ作成
- 実装前に必ずテストを書く（TDD）