# AUMLMASIG 擴充卡一鍵診斷器發布前稽核

## 稽核範圍

- 只稽核 `aumlmasig-expansion-card-diagnoser/`。
- 本階段不登入 Shopline、不發布網站、不新增依賴、不新增後端、不新增資料庫、不修改其他專案資料夾。

## 檔案清單確認

預期檔案：

- [ ] `index.html`
- [ ] `shopline-embed.html`
- [ ] `README.md`
- [ ] `src/app.js`
- [ ] `src/config.js`
- [ ] `src/rules-engine.js`
- [ ] `src/report-generator.js`
- [ ] `src/dom-utils.js`
- [ ] `styles/diagnoser.css`
- [ ] `tests/manual-test-cases.md`
- [ ] `tests/visual-qa-checklist.md`
- [ ] `tests/pre-release-audit.md`

確認方式：

```powershell
rg --files aumlmasig-expansion-card-diagnoser
```

## 禁止字串掃描

- [ ] 依 CR-001S 指定禁止清單掃描整個資料夾。
- [ ] 若命中正式頁不應出現的開發殘留文字，需先移除再上架。
- [ ] 掃描結果需由 CEO 或指定檢查人確認。

建議做法：

- 使用文字搜尋工具掃描整個 `aumlmasig-expansion-card-diagnoser/`。
- 若掃描工具有命中，先確認是否為正式畫面可見文字，再判斷是否阻擋上線。

## 商品連結檢查

- [ ] 商品分類連結只集中在 `src/config.js` 與 `shopline-embed.html` inline 設定。
- [ ] `nvme_basic` 指向正式 NVMe M.2 分類。
- [ ] `nvme_raid` 指向正式 NVMe M.2 分類。
- [ ] `u2` 指向正式 U.2 分類。
- [ ] `sata` 指向正式 SATA 分類。
- [ ] `usb` 指向正式 USB 擴充卡分類。
- [ ] `nic` 指向正式網路卡分類。
- [ ] `other` 與 `unknown` 不顯示商品連結。
- [ ] 高風險結果不顯示推薦商品按鈕。

## 下載中心 URL 檢查

- [ ] 下載中心 URL 已補齊：`https://www.aumlmasig.com/pages/new-page`
- [ ] `src/config.js` 的 `downloadCenterUrl` 指向正式下載中心 URL。
- [ ] `shopline-embed.html` 的 inline 設定指向正式下載中心 URL。
- [ ] 下載中心按鈕顯示後，連結需開啟正式下載中心 URL。

## 客服 URL 檢查

- [ ] 客服聯繫 URL 已補齊：`https://aumlmasig01.github.io/aumlmasig-support-tools/support-contact.html`
- [ ] `src/config.js` 的 `supportUrl` 指向正式客服聯繫 URL。
- [ ] `shopline-embed.html` 的 inline 設定指向正式客服聯繫 URL。
- [ ] 高風險結果不顯示商品導購，需顯示客服協助確認表入口。
- [ ] 客服協助確認表按鈕需開啟正式客服聯繫 URL。

## CEO 決策確認

- [ ] 高風險不導購策略：已核准。
- [ ] 型號級推薦：第一版不啟用。
- [ ] 第一版維持分類推薦。
- [ ] Shopline 貼上前仍需 CEO 預覽簽核。

## Console Error 檢查

- [ ] 用瀏覽器開啟 `index.html`。
- [ ] 開啟開發者工具 Console。
- [ ] 重新整理頁面。
- [ ] 操作案例 1、案例 2、案例 7。
- [ ] 操作期間沒有 error 等級訊息。
- [ ] 若有 error，需截圖或複製錯誤文字，修正後重新驗收。

## 手機版檢查

- [ ] 用瀏覽器開發者工具切到 390px 寬度。
- [ ] 表單可完整操作。
- [ ] chip 多選不需要鍵盤組合鍵。
- [ ] 結果區不被遮擋、不橫向捲動。
- [ ] 複製診斷單按鈕可點擊，成功訊息可讀。

## Shopline 版檢查

- [ ] `shopline-embed.html` 可作為 Shopline 自訂 HTML 使用。
- [ ] class 使用 `auml-` 前綴。
- [ ] 樣式作用範圍限制在 `.auml-diagnoser` 與內部元素。
- [ ] 不依賴本機路徑。
- [ ] 不依賴外部建置工具。
- [ ] 顯示正式下載中心入口。
- [ ] 顯示正式客服協助確認表入口。
- [ ] 高風險結果不顯示推薦商品按鈕。
- [ ] 高風險結果仍顯示客服協助確認表入口。
- [ ] 貼上 Shopline 前需由 CEO 確認這是要上架的版本。

## 回復方式

- 若尚未貼到 Shopline：保留檔案即可，不需發布。
- 若已貼到 Shopline 自訂 HTML 區塊：移除該自訂 HTML 區塊內容，或還原為上一版已核准內容。
- 若只需回復本地新增內容：刪除或還原 `aumlmasig-expansion-card-diagnoser/` 內本次 CR-001S 新增與修改的檔案。

## CEO 最終確認點

- [ ] 商品分類連結是否全部正確。
- [ ] 下載中心 URL 是否正確顯示並連到正式頁。
- [ ] 客服 URL 是否正確顯示並連到正式頁。
- [ ] 高風險不導購策略是否符合公司上線要求。
- [ ] 第一版維持分類推薦、不啟用型號級推薦是否符合公司上線要求。
- [ ] 手機版 390px 是否通過人工視覺驗收。
- [ ] Shopline 預覽是否通過桌機、手機、平板檢查。
- [ ] 對外文字是否不含公司內部成本、供應商、報價底線、未公開策略、客戶個資、API Key、Token、帳號密碼。
- [ ] CEO 是否核准正式上架。
