import {program} from 'commander'
import {generateClientCode} from "./client"

program
    .version('0.0.1')
    .requiredOption('-u, --urls <string...>', 'OpenAPI spec URLs')
    .option('--allowed-paths <string...>', 'list of allowed paths from spec')
    .option('--client', 'only generate client code' )
    .option('--server', 'only generate server code (not implemented yet)')

program.parse()
const options = program.opts()

console.log(options)

const urls = options.urls
const allowedPaths: string[] = options.allowedPaths

if (!options.client && !options.server) {
    options.client = true
    options.server = true
}

if (options.client) {
    generateClientCode(urls, allowedPaths).then(_ => {
    })
}
