import { Service } from "typedi";
import { FileData, FileResponse } from "../models";
import { executeQuery } from "../utils/database/QueryUtil";

@Service()
export class FileService {
  public getFile = async (FileID: number) => {
    try {
      let [result, fields] = await executeQuery<FileResponse[], FileData>(
        "spFileSingle",
        { FileID }
      );
      return result[0][0] as FileData;
    } catch (e) {
      throw e;
    }
  };

  public insertFile = async (Data: Buffer) => {
    try {
      let [result, fields] = await executeQuery<FileResponse[], FileData>(
        "spFileCreate",
        { UserID: 1, Data }
      );
      return result[0][0];
    } catch (e) {
      throw e;
    }
  };

  public deleteFile = async (FileID: number) => {
    try {
      let [result, fields] = await executeQuery<FileResponse[], FileData>(
        "spFileDelete",
        {
          FileID,
        }
      );
      return result[0][0];
    } catch (e) {
      throw e;
    }
  };
}
