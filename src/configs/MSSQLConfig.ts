import { env } from "./env";
import { config } from "mssql";

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
