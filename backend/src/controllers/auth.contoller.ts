import { Request, Response } from "express";

export async function login(req: Request, res: Response) {
  try {
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
