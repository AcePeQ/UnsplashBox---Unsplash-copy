import { Request, Response } from "express";
import { IAuthReq } from "../middlewares/auth.middlewares";
import Collection from "../models/collection.model";

export async function getCollections(req: Request, res: Response) {
  try {
    const authReq = req as IAuthReq;

    if (!authReq.user) {
      res.status(401).json({ message: "Unauthorized - No User Found" });
      return;
    }

    const userCollections = await Collection.find({ userId: authReq.user._id });

    res.status(200).json(userCollections);
  } catch (error) {
    console.log(`Error in get collections controller: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createCollection(req: Request, res: Response) {
  try {
    const authReq = req as IAuthReq;
    const { collection_name } = authReq.body;

    if (!authReq.user) {
      res.status(401).json({ message: "Unauthorized - No User Found" });
      return;
    }

    if (!collection_name) {
      res.status(400).json({ message: "Collection name not found" });
      return;
    }

    const isCollectionNameUsed = await Collection.findOne({
      userId: authReq.user._id,
      collection_name,
    });

    if (isCollectionNameUsed) {
      res
        .status(400)
        .json({ message: "Collection with that name already exists" });
      return;
    }

    const newCollection = new Collection({
      userId: authReq.user._id,
      collection_name,
    });

    await newCollection.save();
    res.status(200).json({ message: "Collection created successfully" });
  } catch (error) {
    console.log(`Error in get collections controller: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
