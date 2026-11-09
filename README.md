# glovertech

長崎県内の中小企業・個人事業主向けAI導入支援サービスのランディングページです。ChatGPT等のAI活用や業務自動化、HP運用の相談を、補助金活用の提案とセットで案内するサイトを提供しています。

## 技術スタック

- **言語 / フレームワーク**: TypeScript, Vue 3, [Nuxt 3](https://nuxt.com/)
- **スタイリング**: Tailwind CSS
- **データ**: 専用のデータベースは持たず、`data/site.ts`（サイト本文・料金・FAQ等の静的データ）と `public/subsidies.json`（補助金情報、`server/api/subsidies.get.ts` 経由で配信）で完結
- **ホスティング**: セルフホストVPS上のnginx（静的サイトとして配信）

## アーキテクチャ

- `main` ブランチへのpushをトリガーに GitHub Actions（`.github/workflows/deploy.yml`）が起動
  1. `npm ci` → `npm run generate` でNuxtの静的サイトを生成（`.output/public/`）
  2. 生成物を `rsync` でVPS上のアプリディレクトリへ同期
  3. nginx設定を配置し、`nginx -t` の構文チェック後にリロード
- VPSへの接続は **SSH鍵認証**（GitHub Actionsシークレット `SSH_PRIVATE_KEY` を使用）。パスワード認証はサーバー側で無効化済みです
- 独自ドメイン（glovertech.jp）へのSSL証明書発行・nginx設定投入は `.github/workflows/setup-glovertech-domain.yml`（手動実行、Let's Encrypt）で行います
- `.github/workflows/ci.yml` がPull Request作成時に型チェック・ビルドを実行します

## ローカルでの起動方法

Node.js 20系を推奨します。

```bash
npm ci
npm run dev
```

`http://localhost:3000` で確認できます。

その他のコマンド:

```bash
npm run typecheck   # 型チェック
npm run generate    # 静的サイトを生成（.output/public/）
npm run preview     # generate後の成果物をローカルでプレビュー
```

ローカル開発に `.env` は不要です（このアプリはランタイムの環境変数を使用していません）。デプロイに使うシークレットの一覧は `.env.example` を参照してください。
