# Simple Form App (しんぷる帳票)

## 概要
Google Gemini Canvasで作成された簡易帳票アプリケーションのReact移植版です。
見積書や請求書をブラウザ上で作成し、PDF保存や印刷が可能です。

## 技術スタック
- React
- Vite
- Tailwind CSS
- Lucide React

## ローカルでの実行
```bash
npm install
npm run dev
```

## GitHub Pagesへのデプロイ
このプロジェクトにはGitHub Actionsによる自動デプロイ設定が含まれています。

1. GitHubで新しいリポジトリを作成してください。
2. 以下のコマンドを実行し、リモートリポジトリを設定してプッシュします。

```bash
git remote add origin <リポジトリのURL>
git branch -M main
git push -u origin main
```

3. プッシュ後、GitHub Actionsが自動的に実行され、`gh-pages`ブランチにビルド成果物がデプロイされます。
4. GitHubリポジトリの **Settings > Pages** を開き、Sourceが `gh-pages` ブランチになっていることを確認してください（自動で設定されない場合は手動で選択してSaveします）。
