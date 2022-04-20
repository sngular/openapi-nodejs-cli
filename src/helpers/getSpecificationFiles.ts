import axios from "axios";
import YAML from "yaml";
import { readFileSync } from "fs";
import { DataObject } from "../types";
import { capitalize, log, getComponentsFiles } from ".";

export async function getSpecificationFiles(
  pathsToSpec: string[]
): Promise<DataObject> {
  let data: DataObject = {};

  for (const pathToSpec of pathsToSpec) {
    log(`Getting OpenAPI specification file from ${pathToSpec}`);

    const specName = pathToSpec.split("/").slice(-1)[0].split(".")[0];
    const isUrl = pathToSpec.startsWith("http");
    let file = "";

    if (isUrl) {
      const response = await axios.get(pathToSpec);
      file = response.data;
    } else {
      file = readFileSync(pathToSpec, "utf-8");
    }

    const refRegex = /"\$ref":"[^},]+/gim;
    let jsonData = YAML.parse(file);

    if (!jsonData.components) {
      const refMatch = JSON.stringify(jsonData.paths).match(refRegex);

      jsonData = JSON.parse(
        JSON.stringify(jsonData).replaceAll(
          refRegex,
          `"$ref": "${capitalize(specName)}Schema"`
        )
      );

      if (refMatch !== null) {
        const refString = refMatch[0].split(":")[1].replaceAll('"', "");

        if (refString.includes("#") && !refString.startsWith("#")) {
          const componentsPath = refString.split("#")[0];

          const response = await getComponentsFiles(componentsPath, isUrl);
          const componentsData = YAML.parse(response);
          const newSchema = {
            [`${capitalize(specName)}Schema`]: componentsData.components.schema,
          };

          if (data.components && data.components.schemas) {
            data.components.schemas = {
              ...data.components.schemas,
              ...newSchema,
            };
          } else {
            data = { ...data, components: { schemas: newSchema } };
          }
        }
      }
    }

    if (data.paths) {
      data.paths = { ...data.paths, ...jsonData.paths };
    } else {
      data = { ...data, ...jsonData };
    }
  }

  return data;
}
