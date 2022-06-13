/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { capitalize, resolveSchemaName, parseTypes } from ".";
import { DataObject, Path } from "../types";

export function parseDocument(data: DataObject) {
  // Parse components.schemas
  if (data.components) {
    const componentsKeys = Object.keys(data.components);

    componentsKeys.forEach((key: string) => {
      data.components[key] = parseSchemas(
        { [key]: data.components[key] },
        data
      )[0];
    });
  }

  // Transform paths and methods from object to array of objects
  data.paths = parsePaths(data.paths);

  data.paths.forEach(({ methods }: DataObject, pathIndex: number) => {
    methods.forEach(
      (
        { parameters, requestBody, responses }: DataObject,
        methodIndex: number
      ) => {
        // Parse method parameters if exists
        if (parameters) {
          parameters.forEach(
            (parameter: DataObject, parameterIndex: number) => {
              data.paths[pathIndex].methods[methodIndex].parameters[
                parameterIndex
              ].type = parseTypes(parameter.schema);
            }
          );
        }

        // Parse method content body if exists
        if (requestBody) {
          if (requestBody.content && requestBody.content["application/json"]) {
            data.paths[pathIndex].methods[methodIndex].requestBody.content[
              "application/json"
            ].type = parseTypes(requestBody.content["application/json"].schema);
          }
        }

        // Parse method responses
        if (responses) {
          responses = parseResponses(responses);
          data.paths[pathIndex].methods[methodIndex].responses =
            parseResponses(responses);

          // Parse response content if exists
          responses.forEach(
            ({ content }: DataObject, responseIndex: number) => {
              if (content && content["application/json"]) {
                const typeKeys = Object.keys(content["application/json"]);
                data.paths[pathIndex].methods[methodIndex].responses[
                  responseIndex
                ].content["application/json"].type = parseTypes(
                  content["application/json"][typeKeys[0]]
                );
              }
            }
          );
        }
      }
    );
  });
  return data;
}

/**
 * @description Get the components.schemas object and returns an array of schemas
 * @param {DataObject} schemas
 * @returns {DataObject[]}
 */
function parseSchemas(schemas: DataObject, data: DataObject): DataObject[] {
  const newSchemas = Object.keys(schemas).map((schema) => ({
    name: schema,
    ...schemas[schema],
  }));
  newSchemas.forEach((schema) => {
    if (schema.allOf) {
      schema.allOf.forEach((item: DataObject, index: number) => {
        if (item["$ref"]) {
          let refSchema = data;
          resolveSchemaName(item["$ref"]).forEach(
            (item) => (refSchema = refSchema[item])
          );
          schema.allOf[index] = refSchema;
        }

        if (item.properties) {
          item.properties = parseObjectPropertiesTypes(item.properties);
        }
      });
    }

    if (schema.properties) {
      schema.properties = parseObjectPropertiesTypes(schema.properties);
    }

    if (schema.type) {
      schema.type = parseTypes(schema);
    }
  });

  return newSchemas;
}

function parseObjectPropertiesTypes(properties: DataObject) {
  const newPropertiesObject: DataObject = {};
  Object.keys(properties).forEach((property) => {
    if (properties[property].enum) {
      let enumType = "";
      properties[property].enum.forEach((element: string, index: number) => {
        enumType =
          index === properties[property].enum.length - 1
            ? enumType + `'${element}'`
            : enumType + `'${element}' | `;
      });
      newPropertiesObject[property] = {
        ...properties[property],
        type: enumType,
      };
    } else if (properties[property].type === "integer") {
      newPropertiesObject[property] = {
        ...properties[property],
        type: "number",
      };
    } else if (properties[property].type === "object") {
      newPropertiesObject[property] = {
        ...properties[property],
        properties: {
          ...parseObjectPropertiesTypes(properties[property].properties),
        },
      };
    } else if (properties[property].type === "array") {
      let itemType = "";

      if (properties[property].items.type) {
        itemType = properties[property].items.type;
      }

      if (properties[property].items["$ref"]) {
        itemType = resolveSchemaName(properties[property].items["$ref"]).slice(
          -1
        )[0];
      }

      if (itemType === "integer") {
        itemType = "number";
      }

      newPropertiesObject[property] = {
        ...properties[property],
        type: `${itemType}[]`,
      };
    } else {
      newPropertiesObject[property] = { ...properties[property] };
    }
  });

  return newPropertiesObject;
}

/**
 * @description Returns an array of objects containing route (string) and methods data
 * @param {DataObject} paths
 * @returns
 */
function parsePaths(paths: DataObject): Path[] {
  return Object.keys(paths).map((path) => {
    const specName = path
      .split("/")[1]
      .split("-")
      .map((word) => capitalize(word))
      .join("");

    return {
      route: formatPath(path),
      methods: parseMethods(paths[path], specName),
    };
  });
}

function formatPath(path: string): string {
  return path
    .split("/")
    .map((element) => {
      if (element.match(/{(.*?)}/gi)) {
        return element.replace("{", "${");
      } else {
        return element;
      }
    })
    .join("/");
}

function parseMethods(methods: DataObject, specName: string) {
  return Object.keys(methods).map((method: string) => ({
    methodName: method,
    ...methods[method],
  }));
}

function parseResponses(responses: DataObject) {
  return Object.keys(responses).map((response) => ({
    responseCode: response,
    ...responses[response],
  }));
}
