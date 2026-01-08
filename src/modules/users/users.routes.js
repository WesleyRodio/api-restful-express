import { Router } from "express";

import { upload } from "../../helpers/multer.js";
import { ensureFile } from "../../shared/middlewares/validate-file.js";

import UsersController from "./users.controller.js";

const router = Router();

router.get("/", UsersController.list);
router.get("/:id", UsersController.getById);
router.post("/", UsersController.create);
router.put("/:id", UsersController.update);
router.put(
  "/:id/avatar",
  upload.single("image"),
  ensureFile,
  UsersController.updateAvatar,
);

export default router;
