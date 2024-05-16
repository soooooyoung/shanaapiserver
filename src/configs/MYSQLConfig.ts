import { env } from "./env";
import { PoolOptions } from "mysql2";

export const MYSQLConfig: PoolOptions = {
  user: env.db.DB_USER,
  password: env.db.DB_PASSWORD,
  host: env.db.DB_HOST,
  database: env.db.DB_DATABASE,
  port: env.db.DB_PORT,
};
