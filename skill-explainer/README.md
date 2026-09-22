# Remotion video — skill-explainer

`skills/remotion-best-practices` を紹介する縦長動画（1080×1920 / 60fps / 10800フレーム = 3分）。

## アートディレクション

「ブルータル・エディトリアル」。印刷物として組んだ紙面を、ハードな UI が横切る構成。

| 役割 | 値 |
| --- | --- |
| 紙 | `#F2F0EB` |
| インク | `#0B0B0C` |
| アクセント | `#1F3BFF`（エレクトリックブルー） |
| 和文 | Noto Sans JP（900 / 700 / 500 / 400） |
| 欧文・数字 | JetBrains Mono |

- 60pxのエンジニアリンググリッド＋300pxごとの縦罫が唯一のテクスチャ。
- ページ番号バッジ、ルーブリック、版面ケイ（`components/Paper.tsx`）、
  進捗ルールとトンボ（`components/PageFurniture.tsx`）で紙面を構成。
- 見出しはクリップ枠＋「-100% → 0%」のワイプで一行ずつ差し込む。
- 動きはすべて `Easing.bezier(0.16, 1, 0.3, 1)` 系のかたいイージング、
  数値だけを扱う箇所は `Easing.step1` でカクつかせる。

## 構成

```
src/
  Composition.tsx          TransitionSeries による本編タイムライン
  Root.tsx                 本編 + 各シーン単体（<Folder> 内）の登録
  components/Paper.tsx     紙の質感
  components/PageFurniture.tsx  進捗ルール・トンボ
  scenes/                  Scene01〜Scene09
```

| # | シーン | 尺 | 内容 |
| --- | --- | --- | --- |
| 01 | Opening | 9s | タイトル、仕様プレート、目次 |
| 02 | AboutRepo | 16s | リポジトリ構成と SKILL.md の入口 |
| 03 | SkillStructure | 22s | 6つのタスクフォルダをカーソルが巡回 |
| 04 | CreateFlow | 24s | create-video → 実装 → Studio → 書き出し |
| 05 | MarkupFrame | 24s | useCurrentFrame() + interpolate() |
| 06 | MarkupStyle | 24s | イージング／インライン記述／transform 回避 |
| 07 | LayoutRules | 22s | セーフエリアと焦点の設計図 |
| 08 | MoreSkills | 20s | 周辺スキルのコンタクトシート |
| 09 | Closing | 21s | 締めとリポジトリ案内 |

シーン間は `@remotion/transitions` の `wipe` / `slide`（14〜16フレーム）。
合計 10920 − 120 = 10800 フレーム。

## Skill 準拠メモ

- `Interactive.*`（HTML/SVG）で要素を登録し、`from` / `durationInFrames` / `premountFor` を
  そのまま渡す。スタジオ上で選択・トリム・数値編集できる。
- アニメーションは `useCurrentFrame()` + インラインの `interpolate()` のみ。
  値の退避や `transform` 文字列は使わない（`scale` / `translate` / `rotate` を使用）。
- 色のクロスフェードは `interpolateColors()`（文字列補間は3要素まで）。

## このサンドボックス固有のセットアップ

- `remotion.media` へ到達できないため、Chrome Headless Shell の代わりに
  `@sparticuz/chromium` のローカルバイナリを使う。
  再作成は下記スクリプト1発（Chromium・SwiftShader・NSS・ldconfig まで面倒を見る）:

  ```bash
  node scripts/setup-chromium.mjs
  ```

- 日本語フォントは `@fontsource/noto-sans-jp`（npm 同梱・オフライン利用）。

## プレビューと検証

書き出したファイルの尺・色域を確認し、レビュー用の素材を作るスクリプト。

```console
node scripts/make-preview-clips.mjs <master.mp4> /home/user/preview
node scripts/preview-server.mjs /home/user/preview 4321   # Range対応の静的サーバ
```

- `make-preview-clips.mjs` は本編を互換重視（yuv420p / limited range / bt709 /
  1秒キーフレーム / faststart）で再エンコードし、さらにシーン別の MP4 と GIF を出力する。
- `preview-server.mjs` は `Range` に対応した静的サーバ。レビューページ
  （`/home/user/preview/index.html`）から本編とシーン別クリップを再生でき、
  ブラウザが読み取った `duration` をその場で表示する。

尺の確認は次の2通りで行える（どちらも10800フレーム=180.000秒を返す）。

```console
ffprobe -v error -show_entries stream=nb_frames -show_entries format=duration <file.mp4>
```

## コマンド

```console
npm i
npm run dev                                  # Studio
npm run lint                                 # eslint + tsc
npx remotion still Scene05-MarkupFrame out.png --frame=600 --scale=0.25
npx remotion render MotionSkillExplainer out/motion-skill-explainer.mp4
```
