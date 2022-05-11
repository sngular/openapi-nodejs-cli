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
    let file = await getFile(isUrl, pathToSpec);

    const refRegex = /"\$ref":"[^},]+/gim;
    let jsonData: DataObject = {};

    const fileExtension = pathToSpec.split(".").slice(-1)[0].toLowerCase();

    if (fileExtension === "yaml" || fileExtension === "yml") {
      jsonData = YAML.parse(file);
    }

    if (fileExtension === "json") {
      jsonData = JSON.parse(file);
    }

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
          const componentsBasePath = pathToSpec
            .split("/")
            .slice(0, -1)
            .join("/");
          const componentsPath = [
            componentsBasePath,
            refString.split("#")[0],
          ].join("/");

          const response = await getComponentsFiles(componentsPath, isUrl);
          let componentsData: DataObject = {};

          const fileExtension = componentsPath
            .split(".")
            .slice(-1)[0]
            .toLowerCase();

          if (fileExtension === "yaml" || fileExtension === "yml") {
            componentsData = YAML.parse(response);
          }

          if (fileExtension === "json") {
            componentsData = JSON.parse(response);
          }

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

async function getFile(isUrl: boolean, pathToSpec: string) {
  let file = "";

  if (isUrl) {
    let response = await axios.get(pathToSpec);
    file = response.data;
  } else {
    file = readFileSync(pathToSpec, "utf-8");
  }
  return file;
}
