import { envValidate } from "../config/env.js";
import logger from "../helpers/logger.js";

const env = envValidate();
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default function (req, res, next) {
  const startTime = Date.now();
  let responseBody;

  const originalJson = res.json.bind(res);
  res.json = data => {
    responseBody = data;
    return originalJson(data);
  };

  const originalSend = res.send.bind(res);
  res.send = data => {
    responseBody = data;
    return originalSend(data);
  };

  const originalEnd = res.end.bind(res);
  res.end = (data, encoding) => {
    if (data) responseBody = data.toString(encoding);
    return originalEnd(data, encoding);
  };

  res.on("finish", () => {
    const duration = Date.now() - startTime;

    const ip = getClientIp(req);
    const cleanIp = ip ? ip.replace(/^::ffff:/, "") : "unknown";
    const formatIps = {
      "::1": "localhost",
      "127.0.0.1": "localhost",
    };

    logger.info(
      {
        ip: cleanIp in formatIps ? formatIps[cleanIp] : cleanIp,
        time: new Date().toISOString(),
        duration: `${duration}ms`,
        method: req.method,
        request_url: req.url,
        status: res.statusCode,
        headers: req.headers,
        body: req.body,
        response: responseBody,
        env: env.NODE_ENV,
        version: env.APP_VERSION,
      },
      "Request received",
    );
    console.log("");
  });

  next();
}

/**
 *
 * @param {import("express").Request} req
 * @returns
 */
function getClientIp(req) {
  // Prioridade: x-forwarded-for > x-real-ip > req.ip > socket
  return (
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.headers["x-real-ip"] ||
    req.ip ||
    req.socket.remoteAddress
  );
}
