import { Router } from "express";

import UsersController from "./users.controller.js";

const router = Router();

router.get("/", UsersController.list);
router.get("/:id", UsersController.getById);
router.post("/", UsersController.create);
// router.put("/:id", UsersController.update);

export default router;
