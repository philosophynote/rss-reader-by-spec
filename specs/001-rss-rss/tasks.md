# Tasks: シンプルなRSSリーダー

**Input**: Design documents from `/specs/001-rss-rss/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Single project**: Next.js app structure at repository root
- Tests in `__tests__/` or `.test.ts` files adjacent to components
- API routes in `app/api/` directory

## Phase 3.1: セットアップ
- [ ] T001 Next.js プロジェクトを TypeScript と Tailwind CSS で初期化
- [ ] T002 [P] shadcn/ui を必要なコンポーネント (card, button, scroll-area, separator) と共にインストール・設定
- [ ] T003 [P] RSS 解析の依存関係をインストール (rss-parser, @types/rss-parser)
- [ ] T004 [P] Vitest と React Testing Library をテスト用に設定
- [ ] T005 [P] API モック用に Mock Service Worker (msw) をインストール
- [ ] T006 [P] ESLint と Prettier の設定

## Phase 3.2: テスト作成 (TDD) ⚠️ 3.3の前に必須完了
**重要: これらのテストは実装前に書かれ、必ず失敗する必要があります**
- [ ] T007 [P] GET /api/rss エンドポイントのコントラクトテストを `__tests__/api/rss.test.ts` に作成
- [ ] T008 [P] RSS フィード解析の統合テストを `__tests__/integration/rss-parser.test.ts` に作成
- [ ] T009 [P] 記事一覧レンダリングの統合テストを `__tests__/integration/article-list.test.tsx` に作成
- [ ] T010 [P] 記事詳細表示の統合テストを `__tests__/integration/article-detail.test.tsx` に作成
- [ ] T011 [P] エラーハンドリングの統合テストを `__tests__/integration/error-handling.test.tsx` に作成

## Phase 3.3: コア実装 (テスト失敗後のみ)
- [ ] T012 [P] Article と RSSResponse の TypeScript インターフェースを `lib/types.ts` に作成
- [ ] T013 [P] RSS 解析ユーティリティを `lib/rss-parser.ts` に作成
- [ ] T014 RSS API エンドポイントを `app/api/rss/route.ts` に実装
- [ ] T015 [P] ArticleCard コンポーネントを `components/ui/article-card.tsx` に作成
- [ ] T016 [P] ArticleList コンポーネントを `components/ui/article-list.tsx` に作成
- [ ] T017 [P] ArticleDetail コンポーネントを `components/ui/article-detail.tsx` に作成
- [ ] T018 [P] ErrorBoundary コンポーネントを `components/ui/error-boundary.tsx` に作成
- [ ] T019 RSS フィード取得付きメインページを `app/page.tsx` に実装

## Phase 3.4: 統合機能
- [ ] T020 ArticleList コンポーネントにローディング状態を追加
- [ ] T021 RSS API にエラーハンドリングとリトライロジックを実装
- [ ] T022 全コンポーネントにレスポンシブデザインを追加
- [ ] T023 記事詳細モーダルまたはナビゲーションを実装
- [ ] T024 パフォーマンス最適化を追加 (遅延読み込み、ページネーション)

## Phase 3.5: 仕上げ
- [ ] T025 [P] RSS parser ユーティリティのユニットテストを `__tests__/unit/rss-parser.test.ts` に作成
- [ ] T026 [P] TypeScript 型検証のユニットテストを `__tests__/unit/types.test.ts` に作成
- [ ] T027 [P] ArticleCard のコンポーネントテストを `components/ui/__tests__/article-card.test.tsx` に作成
- [ ] T028 [P] ArticleList のコンポーネントテストを `components/ui/__tests__/article-list.test.tsx` に作成
- [ ] T029 [P] RSS フィード取得のパフォーマンステスト (<3秒) を `__tests__/performance/rss-fetch.test.ts` に作成
- [ ] T030 クイックスタート検証テストを実行
- [ ] T031 パフォーマンス最適化とコードクリーンアップ
- [ ] T032 実際の RSS フィードでの最終統合テスト

## 依存関係
- セットアップ (T001-T006) → テスト (T007-T011)
- テスト (T007-T011) → 実装 (T012-T019)
- T012-T013 (型・ユーティリティ) → T014-T019 (コンポーネント・API)
- T014 (API) → T019 (メインページ)
- T015-T018 (コンポーネント) → T019 (メインページ)
- 実装 (T012-T019) → 統合 (T020-T024)
- 統合 (T020-T024) → 仕上げ (T025-T032)

## 並列実行例
```bash
# セットアップフェーズ - 同時実行可能:
Task: "shadcn/ui を必要なコンポーネントと共にインストール・設定"
Task: "RSS 解析の依存関係をインストール (rss-parser, @types/rss-parser)"
Task: "Vitest と React Testing Library をテスト用に設定"

# テストフェーズ - 同時実行可能:
Task: "GET /api/rss エンドポイントのコントラクトテストを __tests__/api/rss.test.ts に作成"
Task: "RSS フィード解析の統合テストを __tests__/integration/rss-parser.test.ts に作成"
Task: "記事一覧レンダリングの統合テストを __tests__/integration/article-list.test.tsx に作成"
```

## 注意事項
- [P] タスク = 異なるファイル、相互依存なし
- 対応する機能実装前にすべてのテストが失敗する必要がある
- 各タスク完了後にコミット
- テストで実際の RSS フィードエンドポイント (https://ai-news.dev/feeds/) を使用
- 一貫したスタイリングのため shadcn/ui コンポーネントパターンに従う

## タスク生成ルール
*main() 実行中に適用*

1. **コントラクトから**: 
   - `/api/rss` エンドポイント → コントラクトテストタスク [P] + API実装タスク

2. **データモデルから**:
   - Article エンティティ → TypeScript インターフェースタスク [P]
   - RSSResponse エンティティ → TypeScript インターフェースタスク [P]

3. **ユーザーストーリーから**:
   - "ユーザーがアプリを開いて記事を見る" → ArticleList 統合テスト [P]
   - "ユーザーが記事をクリックして詳細を見る" → ArticleDetail 統合テスト [P]
   - "ネットワーク問題のエラーハンドリング" → エラーハンドリング統合テスト [P]

4. **順序**:
   - セットアップ → テスト → 型/ユーティリティ → コンポーネント → API → メインページ → 仕上げ
   - TDD アプローチ: 対応する実装前にテスト

## 検証チェックリスト
*GATE: main() が返る前にチェック*

- [x] すべてのコントラクトに対応するテストがある (GET /api/rss → コントラクトテスト)
- [x] すべてのエンティティにモデルタスクがある (Article, RSSResponse → TypeScript インターフェース)
- [x] すべてのテストが実装前に来る (Phase 3.2 が 3.3 の前)
- [x] 並列タスクが真に独立している (異なるファイル、共有依存なし)
- [x] 各タスクが正確なファイルパスを指定している
- [x] 他の [P] タスクと同じファイルを変更するタスクがない