import { Request, Response } from "express";
import { IAuthReq } from "../middlewares/auth.middlewares";

export async function getCollections(req: Request, res: Response) {
  try {
    const authReq = req as IAuthReq;

    if (!authReq.user) {
      res.status(401).json({ message: "Unauthorized - No User Found" });
      return;
    }
  } catch (error) {
    console.log(`Error in get collections controller: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
