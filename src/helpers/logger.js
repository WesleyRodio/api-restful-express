import pino from "pino";

import { envValidate } from "../config/env.js";

const env = envValidate();

const logger = () => {
  const isDev = env.NODE_ENV === "development";

  return pino({
    level: isDev ? "debug" : "info",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        ignore: "pid,hostname",
        translateTime: "yyyy-mm-dd HH:MM:ss",
      },
    },
    enabled: true,
  });
};

export default logger();
