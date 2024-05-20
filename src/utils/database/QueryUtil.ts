import { FieldPacket, RowDataPacket } from "mysql2";
import { DBConnectionPool } from "./MYSQLConnector";

function executeQuery<T>(s: string): Promise<[T, FieldPacket[]]>;
function executeQuery<T, ParamObject extends object>(
  s: string,
  p: ParamObject
): Promise<[T, FieldPacket[]]>;

async function executeQuery<
  T extends RowDataPacket[],
  ParamObject extends object
>(queryString: string, params?: ParamObject): Promise<[T, FieldPacket[]]> {
  let placeHolders = "";

  if (params) {
    placeHolders = Object.keys(params)
      .map((k) => `:${k}`)
      .join(", ");

    return DBConnectionPool().execute<T>(
      `${queryString}(${placeHolders})`,
      params
    );
  }
  return DBConnectionPool().execute<T>(`Call ${queryString}()`);
}

export { executeQuery };
