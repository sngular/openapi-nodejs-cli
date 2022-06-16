/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import fs from "fs";
import Handlebars from "handlebars";
import path from "path";
import process from "process";
import { log } from ".";
import { DataObject } from "../types";
import { toPascalCase } from "./toPascalCase";

export const writeOutputFile = (
  data: DataObject,
  templateName: "client" | "server" | "angularClient" | "interfaces" | "javascriptClient" | "javascriptServer",
  outputDir: string = "output",
  filename: string = "index",
  tagname: string = "Custom",
  fileComments: string = "",
  extension: string = "ts"
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
    )} as ${filename}.${extension}`,
    templateName
  );
  fs.writeFileSync(
    path.join(process.cwd(), `/${outputDir}/${filename}.${extension}`),
    output,
    "utf-8"
  );
};
