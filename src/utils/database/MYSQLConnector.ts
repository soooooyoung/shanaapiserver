import { Pool, createPool } from "mysql2/promise";
import { MYSQLConfig } from "../../configs/DBConfig";
import { IllegalStateException } from "../../models";
import { logInfo } from "../../utils/Logger";

let pool: Pool;

export const initPool = async () => {
  try {
    pool = createPool(MYSQLConfig);
    logInfo("Connection Pool generated successfully");
  } catch (e) {
    throw new IllegalStateException("Failed to initialize pool. " + e);
  }
};

export const DBConnectionPool = () => pool;
