import express from "express";
import cors from "cors";
import "reflect-metadata";
import { AppDataSource } from "./config/database";
import userRoutes from "./routes/user";
import orderRoutes from "./routes/order";
import { errorHandler } from "./utils/errorHandler";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 路由
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
app.use((req, res, next) => {
  next({ status: 404, message: "無此路由資訊" });
});
// 錯誤處理中間件必須在所有路由之後
app.use(errorHandler);

// 初始化資料庫連接
AppDataSource.initialize()
  .then(async () => {
    console.log("資料庫連接成功");

    // 嘗試強制同步資料表
    // await AppDataSource.synchronize();
    // console.log("資料表已同步");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`伺服器運行在端口 ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("資料庫連接失敗:", error);
  });
