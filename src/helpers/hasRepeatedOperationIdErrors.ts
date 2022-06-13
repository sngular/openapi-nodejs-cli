import { DataObject } from "../types";
import { log } from "./log";

export function hasRepeatedOperationIdErrors(
  documentList: DataObject[]
): boolean {
  const repeatedOperationidErrors: {
    tagName: string;
    repeatedOperationIds: string[];
  }[] = [];

  documentList.forEach((file) => {
    const operationIdUsage: DataObject = {};

    file.document.paths.forEach((path: DataObject) => {
      path.methods.forEach((method: DataObject) => {
        if (operationIdUsage[method.operationId] === undefined) {
          operationIdUsage[method.operationId] = 1;
        } else {
          operationIdUsage[method.operationId]++;
        }
      });
    });

    const repeatedOperationIds = Object.keys(
      Object.fromEntries(
        Object.entries(operationIdUsage).filter(([_, v]) => (v as number) > 1)
      )
    );

    if (repeatedOperationIds.length > 0) {
      repeatedOperationidErrors.push({
        tagName: file.tagName,
        repeatedOperationIds: repeatedOperationIds,
      });
    }
  });

  const errors: string[] = [];
  let hasError: boolean = false;
  if (repeatedOperationidErrors.length > 0) {
    repeatedOperationidErrors.forEach(
      (repeatedOperationId: {
        tagName: string;
        repeatedOperationIds: string[];
      }) => {
        errors.push(
          `File ${
            repeatedOperationId.tagName
          }: ${repeatedOperationId.repeatedOperationIds.join(", ")}`
        );
      }
    );

    log(
      `Duplicate operationId have been found: \n\t\t ${errors.join("\n\t\t")}`
    );

    hasError = true;
  }
  return hasError;
}
