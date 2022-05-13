import axios from "axios";
import YAML from "yaml";
import { readFileSync } from "fs";
import { DataObject } from "../types";
import { capitalize, log, getComponentsFiles, parseTypes } from ".";

export async function getSpecificationFiles(
  pathsToSpec: string[]
): Promise<DataObject> {
  let data: DataObject = {};
  let interfacesData: { [key: string]: string } = {};

  for (const pathToSpec of pathsToSpec) {
    log(`Getting OpenAPI specification file from ${pathToSpec}`);
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

      Object.keys(jsonData.paths).forEach((path: string) => {
        const methods = Object.keys(jsonData.paths[path]);

        methods.forEach((method: string) => {
          const methodInfo = jsonData.paths[path][method];
          const responses = { ...methodInfo.responses };
          const statusCodes = Object.keys(responses);

          statusCodes.forEach((statusCode: string) => {
            if (responses[statusCode].content) {
              const contentKeys = Object.keys(
                responses[statusCode].content["application/json"]
              );
              contentKeys.forEach((key: string) => {
                responses[statusCode].content["application/json"][key] = {
                  $ref: parseTypes(
                    responses[statusCode].content["application/json"][key]
                  ),
                };
              });
            }
          });
        });
      });

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

          const componentKeys = Object.keys(componentsData.components);

          componentKeys.forEach((key: string) => {
            interfacesData[capitalize(key)] = componentsData.components[key];
          });
          data = { ...data, components: interfacesData };
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
