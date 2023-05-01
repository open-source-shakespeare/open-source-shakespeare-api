import express from "express";
import { router } from "./routes/router";
import { errorHandler } from "./middleware/error-handler";
import { logger } from "./middleware/logger";
import { initDb } from "./database";

initDb();

const app = express();

app.use(logger);
app.use("/api/v1", router);
app.use(errorHandler);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
