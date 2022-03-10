import {generateClientCode} from "./client";

const urls = ['/kafka.yaml', '/schemaRegistry.yaml']
const allowedPaths: string[] = []

generateClientCode(urls, allowedPaths).then(_ => {
})