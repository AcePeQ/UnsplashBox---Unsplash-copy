import { Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export function generateToken(userId: mongoose.Types.ObjectId, res: Response) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
}
