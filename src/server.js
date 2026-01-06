import express from "express";

import { envValidate } from "./config/env.js";
import expressLogger from "./plugins/express-logger.js";
import router from "./routes/index.js";
import errorHandler from "./shared/middlewares/error-handler.js";

const env = envValidate();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressLogger);

app.use(router);

app.use(errorHandler);

const PORT = env.PORT || 3000;
app.listen(PORT, () => {
  console.log("");
  console.log("🌎 Server is running on port", PORT);
});
