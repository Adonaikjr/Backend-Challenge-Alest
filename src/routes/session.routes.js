import { Router } from "express";
import { session_controller } from "../controller/session_controller.js";
import { AuthMiddleware } from "../middleware/authMiddleware.js";

const sessionRoutes = Router();

const sessionController = new session_controller();

sessionRoutes.post("/", sessionController.consult);
export { sessionRoutes };
