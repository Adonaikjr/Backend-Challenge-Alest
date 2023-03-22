import { Router } from "express";
import { clothesRoutes } from "./ clothes.routes.js";
import { sessionRoutes } from "./session.routes.js";
import { userRoutes } from "./users.routes.js";
const routes = Router();

routes.use("/users", userRoutes);
routes.use("/clothes", clothesRoutes);
routes.use("/session", sessionRoutes );
export { routes };