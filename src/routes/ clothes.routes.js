import { Router } from "express";
import multer from "multer";
import { MULTER } from "../configs/upload.js";
import { clothes_controller } from "../controller/clothes_controller.js";
import { AuthMiddleware } from "../middleware/authMiddleware.js";
const clothesRoutes = Router();
const clothesController = new clothes_controller();

const uploadFile = multer(MULTER);

clothesRoutes.post("/", uploadFile.single("linkUrl"), clothesController.create);
clothesRoutes.post("/:title", clothesController.SearchTitle);
clothesRoutes.get("/", clothesController.show);
clothesRoutes.delete('/:id', AuthMiddleware, clothesController.delete)
clothesRoutes.put('/:id',uploadFile.single("linkUrl"), clothesController.update)
export { clothesRoutes };
