import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { initModels } from "./models/init-models";

dotenv.config();

export const sequelize = new Sequelize({
  host: process.env.MYSQL_HOST ?? "localhost",
  database: process.env.MYSQL_DATABASE ?? "shakespeare",
  username: process.env.MYSQL_USER ?? "root",
  password: process.env.MYSQL_PASSWORD ?? "1234",
  port: parseInt(process.env.MYSQL_PORT ?? "3306"),
  dialect: "mysql",
  logging: false,
});

export function initDb() {
  initModels(sequelize);

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

  sequelize.sync();
}
