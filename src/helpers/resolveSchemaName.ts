/**
 * @description If the input starts with '#', returns an array containing the strings required to access the schema
 * @param {string} refValue
 * @returns {string[]}
 */
export function resolveSchemaName(refValue: string): string[] {
  if (!refValue.startsWith("#") && !refValue.includes("#")) {
    return [refValue];
  }

  return refValue.split("/").slice(1);
}
