import axios from "axios";
import fs from "fs";

export async function getComponentsFiles(filePath: string, isUrl: boolean) {
  if (isUrl) {
    let response = await axios.get(filePath);
    return response.data;
  }
  return fs.readFileSync(filePath, "utf-8");
}
