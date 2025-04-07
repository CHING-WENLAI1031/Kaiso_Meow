import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { JWT_SECRET } from "../config/constants";
import { AppDataSource } from "../config/database";

interface RegisterBody {
  email: string;
  password: string;
  name: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export const register = async (
  req: Request<{}, any, RegisterBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;
    const userRepository = AppDataSource.getRepository(User);

    // 檢查使用者是否已存在
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "此電子郵件已被註冊" });
    }

    // 加密密碼
    const hashedPassword = await bcrypt.hash(password, 10);

    // 創建新使用者
    const user = userRepository.create({
      email,
      password: hashedPassword,
      name,
    });
    await userRepository.save(user);

    // 生成 JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(201).json({
      message: "註冊成功",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request<{}, any, LoginBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);

    // 查找使用者
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "電子郵件或密碼錯誤" });
    }

    // 驗證密碼
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "電子郵件或密碼錯誤" });
    }

    // 生成 JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.json({
      message: "登入成功",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    // 由於使用 JWT，後端不需要特別處理登出
    // 前端只需要移除儲存的 token 即可
    return res.json({ message: "登出成功" });
  } catch (error) {
    next(error);
  }
};
