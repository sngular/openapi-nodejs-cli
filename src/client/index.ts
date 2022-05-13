import { writeOutputFile, log } from "../helpers";
import { cleanComponents, getUsedComponents } from "../helpers/usedComponents";
import { DataObject } from "../types";

export const generateClientCode = (
  data: DataObject,
  angular: boolean = false,
  outputDir: string = "output",
  tagname: string = "custom",
  fileComments: string = ""
) => {
  log("Generating client code", "client");

  const usedComponents = getUsedComponents(data).map((component: string) =>
    component.replace(/([^a-zA-Z]+)/g, "")
  );
  data.components = cleanComponents(data.components, usedComponents);

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
