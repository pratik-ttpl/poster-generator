import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import passport from "passport";

const authRoutes = Router();
authRoutes.get("/sso", authController.sso);
authRoutes.get('/linkedin', authController.authenticateLinkedIn);
authRoutes.get("/linkedin/callback", authController.handleLinkedinCallback);

export { authRoutes };
