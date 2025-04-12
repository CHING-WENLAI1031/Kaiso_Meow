import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status?: number;
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    message: "發生錯誤",
    error: process.env.NODE_ENV === "development" ? err.message : "請稍後再試",
  });
};
