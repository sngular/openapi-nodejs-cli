import { writeOutputFile, log } from "../helpers";
import { DataObject } from "../types";

export const generateClientCode = (
  data: DataObject,
  angular: boolean = false
) => {
  log("Generating client code", "client");

  if (angular) {
    writeOutputFile(data, "angularClient", "output/client", "index.service");
  } else {
    writeOutputFile(data, "client", "output/client", "index");
  }
};
