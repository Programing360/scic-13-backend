import { type NextFunction, type Request, type Response } from "express";
import { verifyToken } from "../jwt.js";

export interface AuthUser {
  id: string;
  role: "ADMIN" | "USER";
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized",
        data: null,
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token as string) as AuthUser;

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      data: null,
    });
  }
};
