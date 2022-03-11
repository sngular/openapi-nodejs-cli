# OpenAPI NodeJS CLI

## Build

Build the project with `npm run build`

## Usage

To view usage of the cli run:

`npm start -- -h`

### Options

- `-u <string...>`: list of URLs to the list of OpenAPI specification used to generate the code
- `--allowed-paths <string..>`: list of paths allowed to be used to generate the code
- `--client`: generate client code only
- `--server`: generate server code only (Not implemented yet)

If `--client` and `--server` are not set, both client and server code will be generated.

### Examples

- Generate code from 2 OpenAPI specification files

    `npm start -- -u http://127.0.0.1:8080/kafka.yaml http://127.0.0.1:8080/schemaRegistry.yaml`

- Only generate client code from 1 file using only the given path

    `npm start -- -u http://127.0.0.1:8080/kafka.yaml --allowed-paths /kafka --client`