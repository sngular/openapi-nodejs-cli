import { DataObject } from "../types";
import { capitalize } from "./capitalize";
import { resolveSchemaName } from "./resolveSchemaName";

export function parseTypes(schema: DataObject): string | undefined {
  if (schema.type) {
    switch (schema.type) {
      case "integer":
        return "number";
      case "array":
        if (schema.items.type) {
          return `${schema.items.type}[]`;
        }

        if (schema.items["$ref"]) {
          return capitalize(
            `${resolveSchemaName(schema.items["$ref"]).slice(-1)[0]}[]`
          );
        }
      default:
        return schema.type;
    }
  }
  if (schema["$ref"]) {
    const schemaName = resolveSchemaName(schema["$ref"]);

    return capitalize(schemaName.slice(-1)[0]);
  }
}
