import { env } from "./env";
import { PoolOptions } from "mysql2";
import { config } from "mssql";

export const MYSQLConfig: PoolOptions = {
  user: env.db.DB_USER,
  password: env.db.DB_PASSWORD,
  host: env.db.DB_HOST,
  database: env.db.DB_DATABASE,
  port: env.db.DB_PORT,
};

export const MSSQLConfig: config = {
  user: env.db.DB_USER,
  password: env.db.DB_PASSWORD,
  server: env.db.DB_HOST || "",
  database: env.db.DB_DATABASE,
  options: {
    trustedConnection: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
  port: env.db.DB_PORT,
};
