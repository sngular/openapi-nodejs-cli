import { writeOutputFile, log } from "../helpers";
import { DataObject } from "../types";

export const generateServerCode = (data: DataObject) => {
  log("Generating server code", "server");

  writeOutputFile(data, "server", "output/server", "index");
};
