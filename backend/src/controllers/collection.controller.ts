import { Request, Response } from "express";
import { IAuthReq } from "../middlewares/auth.middlewares";
import Collection, { ICollectionItem } from "../models/collection.model";

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
    console.log(`Error in getting collections controller: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getCollection(req: Request, res: Response) {
  try {
    const authReq = req as IAuthReq;

    if (!authReq.user) {
      res.status(401).json({ message: "Unauthorized - No User Found" });
      return;
    }
    const collection_name = authReq.query.collection_name as string;

    const decodedCollectionName = decodeURI(collection_name);

    const collection = await Collection.findOne({
      userId: authReq.user._id,
      collection_name: decodedCollectionName,
    });

    if (!collection) {
      res.status(404).json({ message: "Collection not found" });
      return;
    }

    res.status(200).json(collection);
  } catch (error) {
    console.log(`Error in getting collections controller: ${error}`);
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
    console.log(`Error in adding collection controller: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function addImageToCollection(req: Request, res: Response) {
  try {
    const authReq = req as IAuthReq;
    const { collection_id, image } = authReq.body;

    if (!authReq.user) {
      res.status(401).json({ message: "Unauthorized - No User Found" });
      return;
    }

    if (!collection_id || !image) {
      res.status(400).json({ message: "Image does not exist" });
      return;
    }

    const collection = await Collection.findOne({
      _id: collection_id,
      userId: authReq.user._id,
    });

    if (!collection) {
      res.status(400).json({ message: "Collection not found" });
      return;
    }

    const isImageAlreadyInCollection = collection.collection.find(
      (imageItem) => imageItem.id === image.id
    );

    if (isImageAlreadyInCollection) {
      res.status(400).json({
        message: `Image is already in the collection: ${collection.collection_name}`,
      });
      return;
    }

    collection.collection.push(image);

    await collection.save();

    res.status(200).json({
      message: `Image added to collection: ${collection.collection_name}`,
    });
  } catch (error) {
    console.log(`Error in get add image to collection controller: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteImageFromCollection(req: Request, res: Response) {
  try {
    const authReq = req as IAuthReq;
    const { collection_id, image_id } = authReq.body;

    if (!authReq.user) {
      res.status(401).json({ message: "Unauthorized - No User Found" });
      return;
    }

    if (!collection_id || !image_id) {
      res.status(400).json({ message: "Invalid data" });
      return;
    }

    const collection = await Collection.findOne({
      _id: collection_id,
      userId: authReq.user._id,
    });

    if (!collection) {
      res.status(400).json({ message: "Collection not found" });
      return;
    }

    const findedImageIndex = collection.collection.findIndex(
      (image) => image_id === image.id
    );

    if (findedImageIndex === -1) {
      res.status(404).json({ message: "Image not found" });
      return;
    }

    collection.collection.splice(findedImageIndex, 1);

    await collection.save();

    res.status(200).json({
      message: `Image removed from the collection: ${collection.collection_name}`,
    });
  } catch (error) {
    console.log(`Error in removing image from collection controller: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getImageCollections(req: Request, res: Response) {
  try {
    const authReq = req as IAuthReq;
    const { image_id } = authReq.query;

    if (!authReq.user) {
      res.status(401).json({ message: "Unauthorized - No User Found" });
      return;
    }

    const collections = await Collection.find({
      userId: authReq.user._id,
    });

    if (!collections) {
      res.status(404).json({ message: "User collections not found" });
      return;
    }

    const filteredCollections = collections.filter((collection) => {
      const isImageInTheCollection = collection.collection.find(
        (image) => image.id === image_id
      );
      if (!isImageInTheCollection) {
        return false;
      }

      return true;
    });

    res.status(200).json(filteredCollections);
  } catch (error) {
    console.log(`Error in getting image collections controller: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
