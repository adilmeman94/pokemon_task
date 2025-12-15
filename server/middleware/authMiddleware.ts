import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import allUsers from "../allUsers.json";
interface JwtExpPayload {
  id: string;
  iat: number;
  exp: number;
}

const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        //decodes token id
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtExpPayload;
        const user = allUsers.find((u) => u.id === decoded.id);
        //todo: find user
        if (user) {
          req.user = user;
        } else {
          throw new Error();
        }

        next();
      } catch (error) {
        res.status(401).json({ data: { error: "Invalid or expired token" } });
      }
    }

    if (!token) {
      res.status(401).json({ data: { error: "No token found in request" } });
    }
  }
);

export { authMiddleware };
