import { Request, Response } from "express";
import { Order, OrderStatus } from "../entities/Order";
import { AppDataSource } from "../config/database";

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount, paymentMethod } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: "未授權的請求" });
      return;
    }

    const orderRepository = AppDataSource.getRepository(Order);

    // 創建新訂單
    const order = orderRepository.create({
      amount,
      paymentMethod,
      status: OrderStatus.PENDING,
      user: { id: userId },
    });

    await orderRepository.save(order);

    res.status(201).json({
      message: "訂單創建成功",
      order: {
        id: order.id,
        amount: order.amount,
        status: order.status,
        paymentMethod: order.paymentMethod,
        createdAt: order.createdAt,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: "創建訂單失敗", error: error.message });
  }
};
