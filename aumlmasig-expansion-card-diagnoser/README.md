# AUMLMASIG 擴充卡一鍵診斷器

## 專案用途

本專案是 AUMLMASIG「擴充卡一鍵診斷器」正式版純前端元件。客戶可在購買前完成三步驟選型，取得建議卡種、風險分級、相容提醒、三種方案、推薦商品分類連結與可複製客服診斷單。

CR-001V2 起，主方案改為 GitHub Pages 外部部署：Shopline 只放簡短導流文案與外部連結，完整診斷器部署到 `https://aumlmasig01.github.io/aumlmasig-support-tools/diagnoser/`。

本工具採 Local-First 設計，不使用後端、不使用資料庫、不需要登入、不收集個資、不上傳客戶資料。

## 本機開啟方式

直接用瀏覽器開啟：

```text
aumlmasig-expansion-card-diagnoser/index.html
```

不需要安裝套件或啟動伺服器。

## 檔案結構

```text
aumlmasig-expansion-card-diagnoser/
  index.html
  shopline-embed.html
  README.md
  src/
    app.js
    config.js
    rules-engine.js
    report-generator.js
    dom-utils.js
  styles/
    diagnoser.css
  tests/
    manual-test-cases.md
    visual-qa-checklist.md
    pre-release-audit.md
deploy/
  aumlmasig-support-tools/
    GITHUB_PAGES_UPLOAD_LIST.md
    diagnoser/
      index.html
      styles/
        diagnoser.css
      src/
        app.js
        config.js
        rules-engine.js
        report-generator.js
        dom-utils.js
```

## CEO 如何用本機開啟 index.html

1. 開啟檔案總管。
2. 進入 `aumlmasig-expansion-card-diagnoser/`。
3. 對 `index.html` 按兩下，用瀏覽器開啟。
4. 確認頁面顯示「擴充卡一鍵診斷器」。
5. 依 `tests/visual-qa-checklist.md` 的七個案例完成測試。

此版本不需要安裝套件、不需要啟動伺服器、不需要登入帳號。

## CEO 如何人工測試手機版

1. 用 Chrome 或 Edge 開啟 `index.html`。
2. 按 `F12` 開啟開發者工具。
3. 切換裝置模擬模式。
4. 將寬度設定為 390px。
5. 依序檢查表單、按鈕、chip 多選、結果區、診斷單與商品按鈕。
6. 確認沒有橫向捲動、文字重疊、按鈕太小或結果被遮擋。

平板版可用同一方式將寬度設定為 768px，再依人工視覺驗收清單檢查。

## 如何修改商品分類連結

商品分類連結集中在 `src/config.js` 的 `categoryLinks`。只修改已確認可對外使用的正式分類網址。

下載中心與客服連結也在 `src/config.js`：

```js
downloadCenterUrl: "https://www.aumlmasig.com/pages/new-page",
supportUrl: "https://aumlmasig01.github.io/aumlmasig-support-tools/support-contact.html"
```

目前 CEO 已提供正式下載中心 URL 與正式客服聯繫 URL，模組版與 Shopline inline 版都已同步補齊。

## 如何修改診斷規則

診斷規則集中在 `src/rules-engine.js` 的 `diagnoseExpansionCard(answers)`。此函式輸入表單答案，輸出風險等級、建議卡種、三種方案、相容提醒、購買前確認事項與診斷單文字。

新增規則時請保持：

- 不把判斷規則寫進 HTML。
- 資料不足時使用中風險或高風險提醒，不做確定性承諾。
- 對外文字避免過度承諾，例如保證相容、一定可用、完全不會降速。
- 測試資料使用假資料或去識別化資料。

## GitHub Pages 部署方式

CR-001V2 主方案是將完整診斷器部署到 GitHub Pages repository：

```text
deploy/aumlmasig-support-tools/diagnoser/
```

上傳到 GitHub repository 後，應放在：

```text
diagnoser/
```

預期正式診斷器網址：

```text
https://aumlmasig01.github.io/aumlmasig-support-tools/diagnoser/
```

上傳清單、Shopline 導流文案、測試項目與回復方式請看：

```text
deploy/aumlmasig-support-tools/GITHUB_PAGES_UPLOAD_LIST.md
```

## Shopline 導流方式

Shopline 不再嵌入完整診斷器。請只放簡短說明、按鈕與外部連結：

```text
https://aumlmasig01.github.io/aumlmasig-support-tools/diagnoser/
```

正式導流文案請以 `deploy/aumlmasig-support-tools/GITHUB_PAGES_UPLOAD_LIST.md` 為準。

## Shopline 完整嵌入版狀態

`shopline-embed.html` 是可直接放入 Shopline 自訂 HTML 區塊的版本，CSS class 使用 `auml-` 前綴，降低影響其他版面的機率。

因 Shopline 預覽曾發生版面貼左與樣式失效問題，CR-001V2 不再把完整診斷器嵌入 Shopline。此檔案保留作為備援與歷史參考，不作為主發布方案。

操作方式：

1. 開啟 `shopline-embed.html`。
2. 複製檔案內容。
3. 貼到 Shopline 自訂 HTML 區塊。
4. 在手機與桌機預覽中測試表單、診斷結果、商品連結與複製功能。

若未來改成外部 JS 版本，正式發布時應使用固定版本檔案路徑或固定 commit SHA，不要引用會任意變動的開發分支檔案。

## CEO 如何放置 Shopline 導流入口

1. 先完成 `tests/pre-release-audit.md`。
2. 先將 `deploy/aumlmasig-support-tools/diagnoser/` 上傳到 GitHub Pages repository 的 `diagnoser/`。
3. 確認 `https://aumlmasig01.github.io/aumlmasig-support-tools/diagnoser/` 可正常開啟。
4. 將 `GITHUB_PAGES_UPLOAD_LIST.md` 內的 Shopline 導流文案貼到 Shopline 指定位置。
5. 先使用 Shopline 預覽，不要直接發布。
6. 在 Shopline 預覽中檢查桌機、390px 手機、768px 平板。
7. 確認按鈕連到 GitHub Pages 診斷器。
8. CEO 最終確認後，才可進入正式發布流程。

## 正式 URL 與導流策略

- 正式下載中心 URL：`https://www.aumlmasig.com/pages/new-page`
- 正式客服聯繫 URL：`https://aumlmasig01.github.io/aumlmasig-support-tools/support-contact.html`
- 高風險不導購策略已由 CEO 核准：高風險結果不顯示推薦商品按鈕，改引導客戶使用客服協助確認表。
- 第一版維持分類推薦，不做型號級推薦。
- Shopline 貼上前仍需 CEO 進行預覽簽核。

## 發布前必須補齊的資料

- 商品分類連結最終確認。
- Shopline 要放置的頁面位置。
- CEO 最終確認 Shopline 預覽畫面。
- CEO 最終確認正式上架時機。

## 正式發布需要 CEO 最終確認

正式發布前，CEO 需確認：

- `tests/visual-qa-checklist.md` 已完成。
- `tests/pre-release-audit.md` 已完成。
- 手機版 390px 可正常操作。
- Shopline 預覽通過桌機、手機、平板檢查。
- 對外文字不含公司內部成本、供應商、報價底線、未公開策略、客戶個資、API Key、Token、帳號密碼。
- 下載中心、客服入口與商品分類連結均為可對外使用的正式資料。

## 發布前檢查表

- `index.html` 可本機直接開啟。
- GitHub Pages deploy 版 `deploy/aumlmasig-support-tools/diagnoser/index.html` 可本機直接開啟。
- Shopline 只放導流文案與外部連結，不嵌入完整診斷器。
- 390px 手機寬度可正常操作。
- 痛點多選不需要 Ctrl。
- 診斷結果能正確顯示低風險、中風險、高風險。
- 能產生完整可複製診斷單。
- 商品分類連結依主要需求切換。
- 下載中心與客服協助確認表入口指向 CEO 已核准的正式 URL。
- console 沒有錯誤。
- 內容不包含開發狀態字樣、無效測試網址或未確認導流網址。
- 對外內容不暴露公司內部機密。
- `tests/manual-test-cases.md` 的七個案例皆完成驗收。

## 不可放入前端的資料清單

- 內部成本
- 供應商
- 報價底線
- 未公開策略
- 客戶個資
- API Key
- Token
- 帳號密碼
