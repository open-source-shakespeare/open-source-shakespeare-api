import express from "express";
import morgan from "morgan";
import { charactersRouter } from "./routes/characters-routes";
const app = express();

const logger = morgan(":method :url :status :response-time ms - :res[content-length]");

app.use(logger);
app.use("/characters", charactersRouter);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
