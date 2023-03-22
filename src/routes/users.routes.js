import { Router } from "express";
import { user_controller } from "../controller/user_controller.js";

const userRoutes = Router();

const userController = new user_controller();

userRoutes.post("/", userController.create);
userRoutes.get("/", userController.show);
export {userRoutes}