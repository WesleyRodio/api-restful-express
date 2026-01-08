import responses from "../../helpers/responses.js";
import { ValidationError } from "../error/index.js";

export function ensureFile(req, res, next) {
  if (!req.file) {
    throw new ValidationError(responses.invalidData(), [
      {
        field: "image",
        message: "No file uploaded",
        code: "custom",
      },
    ]);
  }
  next();
}
