import {program} from 'commander'
import {generateClientCode} from "./client"
import {generateServerCode} from "./server";

program
    .version('0.0.1')
    .requiredOption('-i, --input <string...>', 'OpenAPI spec URLs or directories')
    .option('--allowed-paths <string...>', 'list of allowed paths from spec')
    .option('--client', 'only generate client code')
    .option('--server', 'only generate server code')

program.parse()
const options = program.opts()

const input = options.input
const allowedPaths: string[] = options.allowedPaths

if (!options.client && !options.server) {
    options.client = true
    options.server = true
}

if (options.client) {
    generateClientCode(input, allowedPaths).then(_ => {
    })
}

if (options.server) {
    generateServerCode(urls, allowedPaths).then(_ => {
    })
}