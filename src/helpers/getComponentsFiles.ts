import axios from "axios";
import fs from "fs";
import path from "path";

export async function getComponentsFiles(filePath: string, isUrl: boolean) {
  if (isUrl) {
    const response = await axios.get(`http://localhost:8080/${filePath}`);
    return response.data;
  }

  return fs.readFileSync(path.join(__dirname, filePath), "utf-8");
}
