import { Request, Response } from "express";
import brcypt from "bcrypt";

import { generateToken } from "../utils/auth.util";
import User from "../models/user.model";

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
      created_at: user.createdAt,
    });
  } catch (error) {
    console.log(`Error in login controller: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function register(req: Request, res: Response) {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const userEmail = await User.findOne({ email });
    const userName = await User.findOne({ username });
    if (userEmail || userName) {
      res
        .status(400)
        .json({ message: "User with this email or username is already exist" });
      return;
    }

    const genSalts = await brcypt.genSalt(10);
    const hashedPassword = await brcypt.hash(password, genSalts);

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.log(`Error in register controller: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function logout(_: Request, res: Response) {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(`Error in logout controller: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
