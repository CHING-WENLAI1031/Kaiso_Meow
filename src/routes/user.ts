import { Router, Request, Response, NextFunction } from "express";
import * as userController from "../controllers/userController";

const router = Router();

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userController.register(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userController.login(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/logout", (req: Request, res: Response, next: NextFunction) => {
  try {
    userController.logout(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default router;
