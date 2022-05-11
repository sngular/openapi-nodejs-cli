import { writeOutputFile, log } from "../helpers";
import { DataObject } from "../types";

export const generateServerCode = (
  data: DataObject,
  outputDir: string = "output",
  filename: string = "index",
  tagName: string = "",
  fileComments: string = ""
) => {
  log("Generating server code", "server");

  writeOutputFile(
    data,
    "server",
    `${outputDir}/server`,
    filename,
    tagName,
    fileComments
  );
};
