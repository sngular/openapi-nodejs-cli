import { writeOutputFile, log } from "../helpers";
import { DataObject } from "../types";

export const generateInterfaceCode = (
  data: DataObject,
  outputDir: string = "output"
) => {
  log("Generating interface code", "interfaces");

  Object.keys(data.components).forEach((key: string) => {
    writeOutputFile(
      { components: { [key]: data.components[key] } },
      "interfaces",
      `${outputDir}/interface`,
      key
    );
  });
};
