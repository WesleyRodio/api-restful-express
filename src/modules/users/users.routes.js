import { Router } from "express";

import usersController from "./users.controller.js";

const router = Router();

router.get("/", usersController.list);

export default router;
