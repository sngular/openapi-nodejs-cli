/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { DataObject } from "../types";
import { parseTypes } from "./parseTypes";

export function getUsedComponents(data: DataObject): string[] {
  let usedComponents: string[] = [];
  data.paths.forEach((path: DataObject) => {
    path.methods.forEach((method: DataObject) => {
      if (method.responses) {
        method.responses
          .filter(
            (response: DataObject) =>
              response.content && response.content["application/json"]
          )
          .forEach((response: DataObject) => {
            const parsedTypes = parseTypes(
              response.content["application/json"]
            );
            if (parsedTypes) {
              if (Array.isArray(parsedTypes)) {
                usedComponents = usedComponents.concat(parsedTypes);
              } else {
                usedComponents.push(parsedTypes);
              }
            }
          });
      }
    });
  });

  return usedComponents;
}

export function cleanComponents(
  components: DataObject,
  usedComponents: string[]
): DataObject {
  const cleanedComponentList: DataObject = {};

  if (components) {
    Object.keys(components).forEach((key: string) => {
      if (usedComponents.includes(key)) {
        cleanedComponentList[key] = components[key];
      }
    });
  }
  return cleanedComponentList;
}
