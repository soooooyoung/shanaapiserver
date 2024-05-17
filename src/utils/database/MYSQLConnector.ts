import { Pool, createPool } from "mysql2/promise";
import { MYSQLConfig } from "../../configs/DBConfig";
import { IllegalStateException } from "../../models";

let pool: Pool;

export const initPool = async () => {
  try {
    pool = createPool(MYSQLConfig);
    console.log("Connection Pool generated successfully");
  } catch (e) {
    throw new IllegalStateException("Failed to initialize pool. " + e);
  }
};

export const DBConnectionPool = () => pool;
