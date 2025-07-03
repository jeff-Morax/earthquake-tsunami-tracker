# 地震海嘯追蹤器 (Earthquake Tsunami Tracker)

這是一個即時監控地震和海嘯資訊的 React 應用程式，使用中央氣象局開放資料 API。

##  功能特色

-  即時地震資訊顯示
-  海嘯警報監控
-  每 30 秒自動更新
-  響應式設計，適配各種裝置

##  安裝與設定

### 1. 複製專案
```bash
git clone https://github.com/jeff-Morax/earthquake-tsunami-tracker.git
cd earthquake-tsunami-tracker
```

### 2. 安裝依賴項
```bash
npm install
```

### 3. 設定環境變數
複製 `.env.example` 檔案並重新命名為 `.env`：
```bash
cp .env.example .env
```

編輯 `.env` 檔案，加入您的中央氣象局 API KEY：
```
REACT_APP_CWA_API_KEY=your_actual_api_key_here
```

### 4. 啟動開發伺服器
```bash
npm start
```

##  取得 API KEY

1. 前往 [中央氣象局開放資料平臺](https://opendata.cwa.gov.tw/)
2. 註冊帳號並登入
3. 申請 API 授權碼
4. 將授權碼加入 `.env` 檔案

##  部署到 GitHub Pages

### 使用 GitHub Actions (推薦)

1. **設定 GitHub Secrets**：
   - 前往您的 GitHub 儲存庫設定頁面
   - 點擊 `Secrets and variables` → `Actions`
   - 點擊 `New repository secret`
   - 名稱：`REACT_APP_CWA_API_KEY`
   - 值：您的 CWA API KEY
   - 點擊 `Add secret`

2. **啟用 GitHub Pages**：
   - 前往儲存庫 `Settings` → `Pages`
   - Source 選擇 `GitHub Actions`

3. **推送代碼**：
   ```bash
   git add .
   git commit -m "Add GitHub Actions deployment"
   git push
   ```

### 手動部署
```bash
npm run deploy
```

##  安全注意事項

 **重要提醒**：
- **永遠不要將 API KEY 直接寫在程式碼中**
- `.env` 檔案已加入 `.gitignore`，不會被推送到 GitHub
- 使用 GitHub Secrets 來安全地管理敏感資訊
- 定期更換 API KEY 以提高安全性

## 📁 專案結構

```
earthquake-tsunami-tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── EarthquakeFetcher.jsx
│   │   └── EarthquakeFetcher.css
│   ├── App.js
│   └── index.js
├── .env.example
├── .github/workflows/deploy.yml
└── README.md
```

## 可用腳本

- `npm start` - 啟動開發伺服器
- `npm test` - 執行測試
- `npm run build` - 建置生產版本
- `npm run deploy` - 部署到 GitHub Pages

##  使用的 API

- [中央氣象局地震報告-顯著有感地震報告](https://opendata.cwa.gov.tw/dataset/earthquake/E-A0016-001)
- [中央氣象局海嘯報告](https://opendata.cwa.gov.tw/dataset/tsunami/E-A0014-001)

##  問題回報

如果您發現任何問題，請在 [GitHub Issues](https://github.com/jeff-Morax/earthquake-tsunami-tracker/issues) 中回報。

##  授權

本專案採用 MIT 授權條款。

---

*本專案使用中央氣象局開放資料，資料僅供參考，實際情況請以官方公告為準。*
