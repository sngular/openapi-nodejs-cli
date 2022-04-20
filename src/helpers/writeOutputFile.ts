import fs from "fs";
import Handlebars from "handlebars";
import path from "path";
import process from "process";
import { log } from ".";
import { DataObject } from "../types";

export const writeOutputFile = (
  data: DataObject,
  templateName: "client" | "server" | "angularClient",
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
