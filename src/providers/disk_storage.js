import fs from "fs";
import path from "path";
import { TMP_FOLDER, UPLOAD_FOLDER } from "../configs/upload.js";

export class disk_storage {
  async saveFile(file) {
    fs.promises.rename(
      path.resolve(TMP_FOLDER, file),
      path.resolve(UPLOAD_FOLDER, file)
    );
    return file;
  }
}
