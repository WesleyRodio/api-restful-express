import { envValidate } from "../../config/env.js";
import { AppError, ValidationError } from "../error/erros.js";

const env = envValidate();
/**
 *
 * @param {AppError} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default function (err, req, res, _next) {
  const errorLog = {
    message: err.message,
    statusCode: err.statusCode,
    errorCode: err.errorCode || "INTERNAL_SERVER_ERROR",
    url: req.url,
    method: req.method,
    body: env.NODE_ENV === "development" ? req.body : undefined,
    params: env.NODE_ENV === "development" ? req.params : undefined,
    query: env.NODE_ENV === "development" ? req.query : undefined,
    timestamp: new Date().toISOString(),
    stack: env.NODE_ENV === "development" ? err.stack : undefined,
  };

  if (err.statusCode >= 500) {
    console.error("❌", errorLog);
  } else if (err.statusCode >= 400) {
    console.warn("⚠️", errorLog);
  } else {
    console.log("ℹ️", errorLog);
  }

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      error: true,
      errorCode: err.errorCode,
      message: err.message,
      details: err.details,
      timestamp: err.timestamp,
      ...(env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: true,
      errorCode: err.errorCode,
      message: err.message,
      timestamp: err.timestamp,
      ...(env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  return res.status(500).json({
    error: true,
    errorCode: "INTERNAL_SERVER_ERROR",
    message:
      env.NODE_ENV === "development" ? err.message : "Internal Server Error",
    timestamp: new Date().toISOString(),
    ...(env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
