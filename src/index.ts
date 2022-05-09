import { program } from "commander";
import { generateClientCode } from "./client";
import {
  getSpecificationFiles,
  parseDocument,
  setHandlebarsHelpers,
} from "./helpers";
import { divideIntoDocumentsByTag } from "./helpers/divideIntoDocumentsByTag";
import { generateServerCode } from "./server";
import { DataObject } from "./types";

setHandlebarsHelpers();

program
  .version("0.0.1")
  .requiredOption("-i, --input <string...>", "OpenAPI spec URLs or directories")
  .option("-o, --output <string...>", "Output folder")
  //  .option("--allowed-paths <string...>", "list of allowed paths from spec")
  .option("--client", "only generate client code")
  .option("--server", "only generate server code")
  .option("--angular", "generate client code for Angular");

program.parse();
const options = program.opts();

const inputs: string[] = options.input;
const allowedPaths: string[] = options.allowedPaths;
const output: string[] = options.output
if (!options.client && !options.server) {
  options.client = true;
  options.server = true;
}

async function main() {

  // TODO Check only one output path has been passed
  if (output && output.length > 1) {
    console.error('ERROR: You can only set one folder as output path');
    process.exit(1);
  }

  const data: DataObject = await getSpecificationFiles(inputs);
  const documentList: DataObject[] = divideIntoDocumentsByTag(data);

  const outputDir: string | undefined = (output && output[0]) || undefined;
  documentList.forEach(document => {
    if (options.client) {
      generateClientCode(document.document, options.angular, outputDir, document.tagName, document.description);
    }
    if (options.server) {
      generateServerCode(document.document, outputDir, document.tagName, document.description);
    }
  })

}

main();
