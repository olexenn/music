import { Service } from "typedi";
import * as fs from "fs";
import * as uuid from "uuid";
import * as path from "path";

export enum FileType {
  AUDIO = "audio",
  IMAGE = "image",
}

@Service()
export class FileService {
  /**
   * Function to download files
   * @param type
   * @param file
   * @returns unique file path
   */
  createFile(type: FileType, file: Express.Multer.File): string {
    const fileExtension = file.originalname.split(".").pop();
    const fileName = uuid.v4() + "." + fileExtension;
    const filePath = path.resolve(__dirname, "..", "static", type);
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
    return type + "/" + fileName;
  }
}
