import path from "path";
import multer from "multer";
import crypto from "crypto";


const __dirname = path.dirname(new URL(import.meta.url).pathname);

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");

const UPLOAD_FOLDER = path.resolve(TMP_FOLDER, "uploads");

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName);
    },
  }),
};

export { TMP_FOLDER, UPLOAD_FOLDER, MULTER };
