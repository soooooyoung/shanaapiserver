import { Service } from "typedi";
import { FileData, FileResponse } from "../models";
import { executeQuery } from "../utils/database/QueryUtil";

@Service()
export class FileService {
  public insertFile = async (data: FileData) => {
    try {
      let [result, fields] = await executeQuery<FileResponse[], FileData>(
        "spFileCreate",
        {}
      );
      return result[0][0];
    } catch (e) {
      throw e;
    }
  };

  public deleteFile = async (postID: number) => {
    try {
      let [result, fields] = await executeQuery<FileResponse[], FileData>(
        "spFileDelete",
        {
          FileID: postID,
        }
      );
      return result[0][0];
    } catch (e) {
      throw e;
    }
  };
}
