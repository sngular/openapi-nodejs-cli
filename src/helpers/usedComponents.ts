import { DataObject } from "../types";

export function getUsedComponents(data: DataObject): string[] {
  const usedComponents: string[] = [];
  data.paths.forEach((path: DataObject) => {
    path.methods.forEach((method: DataObject) => {
      method.responses
        .filter(
          (response: any) =>
            response.content && response.content["application/json"]
        )
        .forEach((response: any) => {
          usedComponents.push(response.content["application/json"].type);
        });
    });
  });
  return usedComponents;
}

export function cleanComponents(
  components: DataObject,
  usedComponents: string[]
): DataObject {
  const cleanedComponentList: DataObject = {};

  Object.keys(components).forEach((key: string) => {
    if (usedComponents.includes(key)) {
      cleanedComponentList[key] = components[key];
    }
  });
  return cleanedComponentList;
}
