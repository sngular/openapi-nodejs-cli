import { writeOutputFile, log } from "../helpers";
import { DataObject } from "../types";

export const generateClientCode = (
  data: DataObject,
  angular: boolean = false,
  outputDir: string = "output",
  tagname: string = "custom",
  fileComments: string = ""
) => {
  log("Generating client code", "client");

  if (angular) {
    writeOutputFile(
      data,
      "angularClient",
      `${outputDir}/client`,
      `${tagname}.service`,
      tagname,
      fileComments
    );
  } else {
    writeOutputFile(
      data,
      "client",
      `${outputDir}/client`,
      tagname,
      tagname,
      fileComments
    );
  }
};
