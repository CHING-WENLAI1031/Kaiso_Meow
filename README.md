# 影片平台 (Video Platform)

這是一個基於 Node.js、Express 和 TypeScript 開發的影片平台後端系統。

## 功能特點

- 用戶認證（註冊/登入/登出）
- JWT 身份驗證
- 訂單管理
- PostgreSQL 資料庫整合
- TypeORM 實體關係映射

## 技術棧

- Node.js
- Express
- TypeScript
- TypeORM
- PostgreSQL
- Docker
- JWT (JSON Web Tokens)

## 環境要求

- Node.js >= 14
- Docker
- Docker Compose
- PostgreSQL 15

## 專案結構

```
src/
├── config/         # 配置文件
├── controllers/    # 控制器
├── entities/       # 資料庫實體
├── middleware/     # 中間件
├── routes/         # 路由
├── utils/          # 工具函數
├── migrations/     # 資料庫遷移
└── app.ts          # 應用入口
```

## 安裝步驟

1. Clone專案：

```bash
git clone [your-repository-url]
cd video-platform
```

2. 安裝依賴：

```bash
npm install
```

3. 設置環境變數：
   創建 `.env` 文件並添加以下內容：

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=kaiso
DB_PASSWORD=123456
DB_DATABASE=video_platform
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

4. 啟動資料庫：

```bash
docker-compose up -d
```

5. 啟動開發伺服器：

```bash
npm run dev
```

## API 端點

### 用戶相關

#### 註冊

- **POST** `/api/user/register`
- **請求體**:

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "使用者名稱"
}
```

#### 登入

- **POST** `/api/user/login`
- **請求體**:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### 登出

- **POST** `/api/user/logout`
- **需要認證**: 是
- **請求頭**: `Authorization: Bearer <token>`

### 訂單相關

#### 創建訂單

- **POST** `/api/order/create`
- **需要認證**: 是
- **請求頭**: `Authorization: Bearer <token>`
- **請求體**:

```json
{
  "amount": 100,
  "paymentMethod": "credit_card"
}
```

## 資料庫結構

### User 表格

- id (主鍵)
- email (唯一)
- password
- name
- profile_url (可選)
- phone (可選)
- createdAt
- updatedAt

### Order 表格

- id (主鍵)
- amount
- status (enum: pending, paid, failed, refunded)
- paymentMethod
- transactionId (可選)
- createdAt
- updatedAt
- userId (外鍵)

## 開發規範

### 代碼風格

- 使用 ESLint 和 Prettier 進行代碼格式化
- 遵循 TypeScript 嚴格模式
- 使用 async/await 處理異步操作
- 使用 TypeORM 裝飾器定義實體關係

### 命名規範

- 文件名：使用小寫字母，多個單詞用連字符分隔
- 類名：使用 PascalCase
- 變量/函數：使用 camelCase
- 常量：使用大寫字母，多個單詞用下劃線分隔

### Git 提交規範

- feat: 新功能
- fix: 修復錯誤
- docs: 文檔更新
- style: 代碼格式調整
- refactor: 代碼重構
- test: 測試相關
- chore: 構建過程或輔助工具的變動

## 測試

### 單元測試

```bash
npm run test
```

### 測試覆蓋率

```bash
npm run test:coverage
```

## 部署

### 開發環境

```bash
npm run dev
```

### 生產環境

```bash
npm run build
npm start
```

### Docker 部署

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 開發指令

- `npm run dev`: 啟動開發伺服器
- `npm run build`: 編譯 TypeScript 代碼
- `npm start`: 運行編譯後的代碼
- `npm run lint`: 運行 ESLint 檢查
- `npm run format`: 運行 Prettier 格式化
- `npm run test`: 運行測試
- `npm run test:coverage`: 運行測試覆蓋率報告

## 注意事項

- 確保 PostgreSQL 容器正在運行
- 開發環境下會自動同步資料庫結構
- 請妥善保管 JWT_SECRET
- 生產環境部署前請修改預設的資料庫憑證

## 貢獻指南

1. Fork 專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 授權

ISC
