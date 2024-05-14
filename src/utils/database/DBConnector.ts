import sql, { ConnectionPool, connect } from "mssql";
import { DBConfig } from "../../configs/DBConfig";
import { IllegalStateException } from "../../models";

let Pool: ConnectionPool;

export const initPool = async () => {
  try {
    Pool = await connect(DBConfig);
    console.log("Connection Pool generated successfully");
  } catch (e) {
    throw new IllegalStateException("failed to initialized pool" + e);
  }
};

export const DB = () => Pool;
