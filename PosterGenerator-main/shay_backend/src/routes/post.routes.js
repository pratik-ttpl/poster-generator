import { Router } from "express";
import multer from "multer";
import postController from "../controllers/post.controller.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const authRoutes = Router();
authRoutes.post("/createTextPost", postController.createTextPost);
authRoutes.post("/createMediaPost", postController.createMediaPost);

export { authRoutes };
