import fs from "fs";
import path, { join } from "path";
import process from "process";
import Handlebars from "handlebars";
import axios from "axios";
import YAML from "yaml";

export { setHandlebarsHelpers } from "./handlebarsHelpers";

export const writeOutputFile = (
  data: any[],
  templateName: "client" | "server",
  outputDir: string = "output",
  filename: string
) => {
  if (!fs.existsSync(path.join(process.cwd(), outputDir))) {
    fs.mkdirSync(path.join(process.cwd(), outputDir), { recursive: true });
  }

  const source = fs.readFileSync(
    path.join(process.cwd(), `/src/templates/${templateName}.hbs`),
    "utf-8"
  );
  const template = Handlebars.compile(source);
  const output = template(data);

  log(
    `Writing ${templateName} output file on ${path.join(
      process.cwd(),
      outputDir
    )} as ${filename}.ts`,
    templateName
  );
  fs.writeFileSync(
    path.join(process.cwd(), `/${outputDir}/${filename}.ts`),
    output,
    "utf-8"
  );
};

export const getSchemaRefPath = (item: any): any => {
  let schemaFilename;
  for (const key of Object.keys(item)) {
    if (typeof item[key] !== "object") {
      continue;
    }

    if (!Object.keys(item).includes("schema")) {
      schemaFilename = getSchemaRefPath(item[key]);

      if (schemaFilename !== undefined) {
        return schemaFilename;
      }

      continue;
    }

    if (!Object.keys(item.schema).includes("$ref")) {
      continue;
    }

    schemaFilename = item.schema.$ref.split("#")[0];
  }

  return schemaFilename;
};

export const setSchema = (
  item: any,
  schemaData: any
): { [key: string]: any } => {
  const newItem: { [key: string]: any } = {};
  for (const key of Object.keys(item)) {
    if (typeof item[key] !== "object") {
      newItem[key] = item[key];
      continue;
    }

    if (!Object.keys(item).includes("schema")) {
      if (item[key] instanceof Array) {
        newItem[key] = item[key];
        continue;
      }

      newItem[key] = setSchema(item[key], schemaData);
      continue;
    }

    if (!Object.keys(item.schema).includes("$ref")) {
      newItem[key] = item[key];
      continue;
    }

    const schemaFilename = item.schema.$ref.split("#")[0];
    if (Object.keys(schemaData).includes(schemaFilename)) {
      newItem.schema = {
        ...item.schema,
        ...schemaData[schemaFilename].components.schema,
      };
    }
  }

  return newItem;
};

export const getSpecificationFile = async (
  inputString: string
): Promise<{ file: string; isUrl: boolean }> => {
  let file: string = "";
  let isUrl = false;
  if (inputString.startsWith("http")) {
    let response = await axios.get(inputString);
    return { file: response.data, isUrl: true };
  }
  file = fs.readFileSync(inputString, "utf-8");
  return { file, isUrl };
};

export const getFilenameAndServer = (
  inputString: string
): { server: string; filename: string } => {
  const splitInputString = inputString.split("/");
  const server = splitInputString
    .slice(0, splitInputString.length - 1)
    .join("/");
  const filename = splitInputString[splitInputString.length - 1];

  return { server, filename };
};

export const getSchemaData = async (
  filename: string,
  inputString: string,
  server: string,
  isUrl: boolean
) => {
  if (isUrl) {
    const response = await axios.get(`${server}/${filename}`);
    return { [filename as string]: YAML.parse(response.data) };
  }
  const newUrl = inputString.split("/").slice(0, -1).join("/");
  const file = fs.readFileSync(join(newUrl, filename as string), "utf-8");
  return { [filename as string]: YAML.parse(file) };
};

export const log = (msg: string, type: string = "info"): void => {
  const time = new Date().toLocaleTimeString();
  console.log(`[${type.toUpperCase()}] ${time} - ${msg}`);
};
