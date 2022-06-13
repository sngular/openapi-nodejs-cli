import fs from "fs";
import Handlebars from "handlebars";
import path from "path";
import process from "process";
import { log } from ".";
import { DataObject } from "../types";
import { toPascalCase } from "./toPascalCase";

export const writeOutputFile = (
  data: DataObject,
  templateName: "client" | "server" | "angularClient" | "interfaces",
  outputDir: string = "output",
  filename: string = "index",
  tagname: string = "Custom",
  fileComments: string = ""
) => {
  if (!fs.existsSync(path.join(process.cwd(), outputDir))) {
    fs.mkdirSync(path.join(process.cwd(), outputDir), { recursive: true });
  }

  const source = fs.readFileSync(
    path.join(__dirname, `/../templates/${templateName}.hbs`),
    "utf-8"
  );

  const template = Handlebars.compile(source);
  const output = template({
    ...data,
    tagname: toPascalCase(tagname),
    description: fileComments,
  });

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
