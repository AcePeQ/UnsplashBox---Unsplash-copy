import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares";
import {
  addImageToCollection,
  createCollection,
  getCollections,
} from "../controllers/collection.controller";

const router = express.Router();

router.get("/collections", verifyToken, getCollections);
// router.get("/collection");
// router.get("/image-collections");

router.post("/create-collection", verifyToken, createCollection);
// router.post("/delete-collection");

router.post("/add-image-to-collection", verifyToken, addImageToCollection);
// router.post("/delete-image-from-collection");

export default router;
