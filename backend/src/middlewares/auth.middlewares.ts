import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/User.Model";
import mongoose from "mongoose";

export interface ICustomJwtPayLoad extends JwtPayload {
  userId: mongoose.Types.ObjectId;
}

export interface IAuthReq extends Request {
  user: IUser;
}

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authReq = req as IAuthReq;
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "Unauthorized - No token provided" });
      return;
    }

    const jwtToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as ICustomJwtPayLoad;

    if (!jwtToken || !jwtToken.userId) {
      res.status(401).json({ message: "Unauthorized - No token provided" });
      return;
    }

    const user = await User.findById(jwtToken.userId).select("-password");

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    authReq.user = user;

    next();
  } catch (error) {
    console.log(`Error in verifyToken middleware: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
