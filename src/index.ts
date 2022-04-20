import { program } from "commander";
import { generateClientCode } from "./client";
import {
  getSpecificationFiles,
  parseDocument,
  setHandlebarsHelpers,
} from "./helpers";
import { generateServerCode } from "./server";
import { DataObject } from "./types";

setHandlebarsHelpers();

program
  .version("0.0.1")
  .requiredOption("-i, --input <string...>", "OpenAPI spec URLs or directories")
  .option("--allowed-paths <string...>", "list of allowed paths from spec")
  .option("--client", "only generate client code")
  .option("--server", "only generate server code")
  .option("--angular", "generate client code for Angular");

program.parse();
const options = program.opts();

const inputs: string[] = options.input;
const allowedPaths: string[] = options.allowedPaths;

if (!options.client && !options.server) {
  options.client = true;
  options.server = true;
}

async function main() {
  const data: DataObject = await getSpecificationFiles(inputs);

  const parsedData = parseDocument(data);

  if (options.client) {
    generateClientCode(parsedData, options.angular);
  }

  if (options.server) {
    generateServerCode(parsedData);
  }
}

main();
