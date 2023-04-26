import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { initModels } from "./models/init-models";

dotenv.config();

export const sequelize = new Sequelize({
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  dialect: "mysql",
  logging: false,
});

export const models = initModels(sequelize);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.sync();
