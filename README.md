# README

[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://github.com/sngular/openapi-nodejs-cli/blob/main/LICENSE)
[![npm version](https://badge.fury.io/js/@sngular%2Fopenapi-nodejs-cli.svg)](https://www.npmjs.com/package/@sngular%2Fopenapi-nodejs-cli)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/13bcbcc9cd144302be8c94999566774f)](https://www.codacy.com/gh/sngular/openapi-nodejs-cli/dashboard?utm_source=github.com&utm_medium=referral&utm_content=sngular/openapi-nodejs-cli&utm_campaign=Badge_Grade)

<p align="center">
<a href="#-summary">Summary</a> ·
<a href="#-getting-started">Getting started</a> ·
<a href="#-support">Support</a> ·
<a href="#license">License</a>
</p>

## 📜 Summary

`openapi-nodejs-cli` is a typescript code generator from an OpenApi document.

`openapi-nodejs-cli` can generate nodejs, typescript client and Angular client methods from an OpenApi document.

## 🚀 Getting Started

### Node version

This generator requires the Node version >=17.7.1 to run properly

### How to install

```bash
npm i @sngular/openapi-nodejs-cli --global
```

### 🧑🏻‍💻 Usage

```bash
npx openapi-nodejs-cli -i input/schema.yaml
```

You can retrieve an option list with this command:

```bash
npx openapi-nodejs-cli --help
```

```bash
Usage: openapi-nodejs-cli [options]

Options:
  -V, --version             output the version number
  -i, --input <string...>   OpenAPI spec URLs or directories
  -o, --output <string...>  Output folder
  --client                  only generate client code
  --server                  only generate server code
  --angular                 generate client code for Angular
  --javascript              generate the code as plain JavaScript instead of TypeScript
  -h, --help                shows this help
```

## 🧰 Support

We’ll be glad to talk and discuss how `openapi-nodejs-cli` can help you 😊

Reach us through [GitHub issues](https://github.com/sngular/openapi-nodejs-cli/issues), [email](mailto:info@sngular.com) or [Twitter](https://twitter.com/sngular).

## License

This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at [https://mozilla.org/MPL/2.0/](https://mozilla.org/MPL/2.0/).
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://github.com/sngular/openapi-nodejs-cli/blob/main/LICENSE)
