import multer from "multer";

import { ValidationError } from "../shared/error/index.js";
import { InvalidUploadImage } from "../shared/error/uploads/index.js";

import responses from "./responses.js";

export const upload = await multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!file) {
      return cb(
        new ValidationError(responses.invalidData(), [
          {
            field: "image",
            message: "No file uploaded",
            code: "custom",
          },
        ]),
        false,
      );
    }

    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new InvalidUploadImage("Only image files are allowed"), false);
    }
  },
});
