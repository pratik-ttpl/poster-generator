import { Router } from "express";
import userController from "../controllers/users.controller.js";
import posterTemplateController from "../controllers/posterTemplate.controller.js";

const userRoutes = Router();
userRoutes.get("/users/templates", userController.getUsers);
userRoutes.get("/user/:id", userController.getUserById);
userRoutes.put("/user/:id", userController.updateUser);
userRoutes.delete("/user/:id", userController.deleteUserById);

userRoutes.get("/poster/template/:id", posterTemplateController.getPosterTemplate);
userRoutes.post("/poster/generate", posterTemplateController.generateAndSavePoster);

export { userRoutes };
