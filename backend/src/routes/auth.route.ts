import express from "express";
import {
  login,
  logout,
  register,
  updateProfileImage,
} from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/auth.middlewares";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

router.post("/update-profile-image", verifyToken, updateProfileImage);

export default router;
