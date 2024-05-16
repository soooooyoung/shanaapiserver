import mysql, { Pool } from "mysql2";
import { MYSQLConfig } from "../../configs/MYSQLConfig";
import { IllegalStateException } from "../../models";

let pool: Pool;

export const initPool = async () => {
  try {
    pool = mysql.createPool(MYSQLConfig);

    console.log("Connection Pool generated successfully");
  } catch (e) {
    throw new IllegalStateException("Failed to initialize pool. " + e);
  }
};

export const DBConnectionPool = () => pool;
