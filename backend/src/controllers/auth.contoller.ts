import { Request, Response } from "express";
import brcypt from "bcrypt";
import User from "../models/User.Model";
import { generateToken } from "../utils/auth.util";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isCorrectPassword = await brcypt.compare(password, user.password);

    if (!isCorrectPassword) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      profilePicture: user.profilePicture,
      username: user.username,
    });
  } catch (error) {
    console.log(`Error in login controller: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function register(req: Request, res: Response) {
  try {
  } catch (error) {
    console.log(`Error in register controller: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
