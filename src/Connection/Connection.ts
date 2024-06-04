import config from "config";
import { Sequelize } from "sequelize";
const user: string = config.get("DB_USER");
const host: string = config.get("DB_HOST");
const database: string = config.get("DB_NAME");
const password: string = config.get("DB_PASSWORD");
const port: number = config.get("DB_PORT");
// console.log(user, host, database, password, port);
export const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: "postgres",
  port: port,
  logging: false,
});

export async function Start() {
  await sequelize
    .sync({ alter: true })
    .then(() => {
      // sequelize.sync();
      console.log("database Synchronized successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
}
