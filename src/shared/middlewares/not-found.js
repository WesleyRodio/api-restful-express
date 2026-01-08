import { NotFoundError } from "../error/index.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default function notFoundHandler(req, _res, _next) {
  throw new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`);
}
