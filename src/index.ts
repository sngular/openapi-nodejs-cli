#!/usr/bin/env node

/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { program } from "commander";
import { generateClientCode } from "./client";
import {
  getSpecificationFiles,
  log,
  setHandlebarsHelpers,
} from "./helpers";
import { divideIntoDocumentsByTag } from "./helpers/divideIntoDocumentsByTag";
import { hasRepeatedOperationIdErrors } from "./helpers/hasRepeatedOperationIdErrors";
import { generateInterfaceCode } from "./interface";
import { generateServerCode } from "./server";
import { DataObject } from "./types";

setHandlebarsHelpers();

program
  .version("0.1.0")
  .requiredOption("-i, --input <string...>", "OpenAPI spec URLs or directories")
  .option("-o, --output <string...>", "Output folder")
  .option("--client", "only generate client code")
  .option("--server", "only generate server code")
  .option("--angular", "generate client code for Angular");

program.parse();
const options = program.opts();

const inputs: string[] = options.input;
const allowedPaths: string[] = options.allowedPaths;
const output: string[] = options.output;
if (!options.client && !options.server) {
  options.client = true;
  options.server = true;
}

async function main() {
  if (output && output.length > 1) {
    log("You can only set one folder as output path", "error");
    process.exit(1);
  }

  const data: DataObject = await getSpecificationFiles(inputs);
  const documentList: DataObject[] = divideIntoDocumentsByTag(data);
  const outputDir: string | undefined = (output && output[0]) || undefined;
  let usedComponents: { [key: string]: DataObject } = {};

  // Recorremos los documentos para comprobar que los operationId son únicos para cada uno de ellos
  if (hasRepeatedOperationIdErrors(documentList)) {
    process.exit(9);
  }

  

  documentList.forEach((document) => {
    usedComponents = {};
    Object.keys(document.document.components).forEach((key: string) => {
      if (!Object.keys(usedComponents).includes(key)) {
        usedComponents[key] = document.document.components[key];
      }
    });

    if (options.client) {
      generateClientCode(
        document.document,
        options.angular,
        outputDir,
        document.tagName,
        document.description
      );
    }
    if (options.server) {
      generateServerCode(
        document.document,
        outputDir,
        document.tagName,
        document.description
      );
    }
  });
  generateInterfaceCode({ components: usedComponents }, outputDir);
}

main();
