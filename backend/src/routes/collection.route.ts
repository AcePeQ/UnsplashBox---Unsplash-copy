import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares";
import { getCollections } from "../controllers/collection.controller";

const router = express.Router();

router.get("/collections", verifyToken, getCollections);
router.get("/collection");
router.get("/image-collections");

router.post("/create-collection");
router.post("/delete-collection");

router.post("/add-image-to-collection");
router.post("/delete-image-from-collection");

export default router;
