import axios from "axios";
import fs from "fs";

export async function getComponentsFiles(filePath: string, isUrl: boolean) {
  if (isUrl) {
    let response = await axios.get(`http://localhost:8080/${filePath}`);
    return response.data;
  }
  return fs.readFileSync(filePath, "utf-8");
}
