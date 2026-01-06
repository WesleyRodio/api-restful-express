// Loading routes
import { Router } from "express";

import userRoutes from "../modules/users/users.routes.js";

const router = Router();

// Mounting user routes
router.use("/users", userRoutes);

export default router;
