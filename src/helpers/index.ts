export { setHandlebarsHelpers } from "./handlebarsHelpers";
export { log } from "./log";
export { parseDocument } from "./documentParser";
export { getComponentsFiles } from "./getComponentsFiles";
export { getSpecificationFiles } from "./getSpecificationFiles";
export { writeOutputFile } from "./writeOutputFile";

export const capitalize = (str: string): string => {
  const lowercase = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lowercase.slice(1);
};
