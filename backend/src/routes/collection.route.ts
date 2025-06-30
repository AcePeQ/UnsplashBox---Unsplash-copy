import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares";
import {
  addImageToCollection,
  createCollection,
  deleteImageFromCollection,
  getCollection,
  getCollections,
  getImageCollections,
} from "../controllers/collection.controller";

const router = express.Router();

router.get("/collections", verifyToken, getCollections);
router.get("/collection", verifyToken, getCollection);
router.get("/image-collections", verifyToken, getImageCollections);

router.post("/create-collection", verifyToken, createCollection);
// router.post("/delete-collection");

router.post("/add-image-to-collection", verifyToken, addImageToCollection);
router.post(
  "/delete-image-from-collection",
  verifyToken,
  deleteImageFromCollection
);

export default router;
