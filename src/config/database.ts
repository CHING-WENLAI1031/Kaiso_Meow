import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Order } from "../entities/Order";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "kaiso",
  password: process.env.DB_PASSWORD || "123456",
  database: process.env.DB_DATABASE || "video_platform",
  synchronize: process.env.DB_SYNCHRONIZE === "true", // 開發環境才啟用同步
  logging: process.env.NODE_ENV === "development",
  entities: [User, Order],
  migrations: ["src/migrations/**/*.ts"],
});
