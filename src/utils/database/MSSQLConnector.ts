import sql, { ConnectionPool, connect } from "mssql";

import { MSSQLConfig } from "../../configs/DBConfig";
import { IllegalStateException } from "../../models";
import { logDebug } from "../../utils/Logger";

let Pool: ConnectionPool;

export const initPool = async () => {
  try {
    Pool = await connect(MSSQLConfig);
    logDebug("Connection Pool generated successfully");
  } catch (e) {
    throw new IllegalStateException("Failed to initialize pool. " + e);
  }
};

export const DBConnectionPool = () => Pool;
