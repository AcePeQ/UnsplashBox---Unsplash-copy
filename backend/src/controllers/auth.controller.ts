import { Request, Response } from "express";
import brcypt from "bcrypt";

import { generateToken } from "../utils/auth.util";
import User from "../models/user.model";
import { IAuthReq } from "../middlewares/auth.middlewares";
import cloudinary from "../configs/cloudinary.config";

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
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.log(`Error in login controller: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function register(req: Request, res: Response) {
  try {
    const { email, password, username } = req.body;

    const trimmedUsername = username.trim();

    if (!email || !password || !trimmedUsername) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      res
        .status(400)
        .json({ message: "Invalid email format: example@gmail.com" });
      return;
    }

    if (password.length < 8) {
      res
        .status(400)
        .json({ message: "Password must contain at least 8 characters" });
      return;
    }

    const userEmail = await User.findOne({ email });
    const userName = await User.findOne({ trimmedUsername });
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
      username: trimmedUsername,
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

export async function updateProfileImage(req: Request, res: Response) {
  try {
    const authReq = req as IAuthReq;

    if (!authReq.user) {
      res.status(401).json({ message: "Unauthorized - No User Found" });
      return;
    }

    const { profilePicture } = req.body;

    if (!profilePicture) {
      res.status(400).json({ message: "Image is required" });
      return;
    }

    const uploadResult = await cloudinary.uploader.upload(profilePicture);

    const updatedUser = await User.findByIdAndUpdate(
      authReq.user._id,
      { profilePicture: uploadResult.secure_url },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(`Error in update profile image controller: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
