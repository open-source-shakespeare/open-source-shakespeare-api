import express from "express";
import { charactersRouter } from "./routes/characters-routes";
import { chaptersRouter } from "./routes/chapters-routes";
import { genresRouter } from "./routes/genres-routes";
import { errorHandler } from "./middleware/error-handler";
import { logger } from "./middleware/logger";
import { NotFoundError } from "./util/errors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(logger);
app.use("/characters", charactersRouter);
app.use("/chapters", chaptersRouter);
app.use("/genres", genresRouter);
app.use("*", (_, __, next) => {
  next(new NotFoundError("The requested resource could not be found."));
});
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
