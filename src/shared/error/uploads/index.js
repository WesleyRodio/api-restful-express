import { BAD_REQUEST, ValidationError } from "../index.js";

export class InvalidUploadImage extends ValidationError {
  constructor(message, details) {
    super(message, BAD_REQUEST, "INVALID_UPLOAD_IMAGE", true);
    this.details = details;
  }
}
