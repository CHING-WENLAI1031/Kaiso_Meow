import { Router } from "express";
import { createOrder } from "../controllers/orderController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// 創建訂單（需要登入）
router.post("/create", authMiddleware, createOrder);

export default router;
