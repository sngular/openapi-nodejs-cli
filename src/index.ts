import {generateClientCode} from "./client";

const urls = ['http://127.0.0.1:8080/kafka.yaml', 'http://127.0.0.1:8080/schemaRegistry.yaml']
const allowedPaths: string[] = []

generateClientCode(urls, allowedPaths).then(_ => {
})