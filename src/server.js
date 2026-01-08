import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";

import { envValidate } from "./config/env.js";
import expressLogger from "./plugins/express.logger.js";
import expressResponses from "./plugins/express.responses.js";
import router from "./routes/index.js";
import errorHandler from "./shared/middlewares/error-handler.js";
import notFoundHandler from "./shared/middlewares/not-found.js";

export const DIRNAME = process.cwd();

const env = envValidate();
const app = express();

app.use(helmet({}));

app.use(
  cors({
    origin: "127.0.0.1,::1,localhost",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
    credentials: true,
    maxAge: 86400,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressLogger);

app.use(expressResponses);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 1,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      error: true,
      errorCode: "TOO_MANY_REQUESTS",
      message: "Too many requests, please try again later.",
      retryAfter: Math.ceil(options.windowMs / 1000) / 60, // in minutes
    });
  },
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});

app.use(limiter);

app.use(router);

app.use(notFoundHandler);

app.use(errorHandler);

const PORT = env.PORT || 3000;
app.listen(PORT, () => {
  console.log("");
  console.log("🌎 Server is running on port", PORT);
});
