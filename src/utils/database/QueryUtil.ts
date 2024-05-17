import { RowDataPacket } from "mysql2";
import { DBConnectionPool } from "./MYSQLConnector";

export const query = async <T extends RowDataPacket[]>(
  query: string
): Promise<T> =>
  new Promise((resolve, reject) =>
    DBConnectionPool().query<T>(query, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    })
  );
