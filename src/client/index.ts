import axios from 'axios'
import YAML from "yaml";
import {getSchemaRefPath, log, setHandlebarsHelpers, setSchema, writeOutputFile} from "../helpers";
import fs from 'fs'
import {join} from 'path'

const pathParamRegex = /{(.*?)}/gi

setHandlebarsHelpers()

const formatPathParam = (path: string): string => {
    return path.split('/').map(element => {
        if (element.match(pathParamRegex)) {
            return element.replace('{', '${')
        } else {
            return element
        }
    }).join('/')
}

export const generateClientCode = async (urls: string[], allowedPaths: string[] = []) => {
    log("Generating client code", 'client')

    for (const url of urls) {
        const splitUrl = url.split('/')
        const server = splitUrl.slice(0, splitUrl.length - 1).join('/')
        const filename = splitUrl[splitUrl.length - 1]
        let isUrl = false

        let file: string = ''
        if (url.startsWith('http')) {
            log(`Getting OpenAPI specification file from ${url}`, 'client')
            isUrl = true
            let response = await axios.get(url)
            file = response.data
        } else {
            log(`Reading OpenAPI specification file from ${url}`, 'client')
            file = fs.readFileSync(url, "utf-8")
        }

        const data = YAML.parse(file)

        let pathsData: any = Object.keys(data.paths).map(key => Object.keys(data.paths[key]).map(method => ({
            pathName: formatPathParam(key),
            method, ...data.paths[key][method]
        }))).flat()

        let filenames = [...new Set(pathsData.map((path: any) => getSchemaRefPath(path)))]

        for (const filename of filenames) {
            if (isUrl) {
                log(`Getting schema file from ${server}/${filename}`, 'client')
                const response = await axios.get(`${server}/${filename}`)
                const schemaData = {[filename as string]: YAML.parse(response.data)}

                pathsData = setSchema(pathsData, schemaData)
            } else {
                const newUrl = url.split('/').slice(0, -1).join('/')
                log(`Reading schema file from ${join(newUrl, (filename as string))}`, 'client')
                const file = fs.readFileSync(join(newUrl, (filename as string)), 'utf-8')
                const schemaData = {[filename as string]: YAML.parse(file)}

                pathsData = setSchema(pathsData, schemaData)
            }
        }

        pathsData = Object.values(pathsData)

        if (allowedPaths.length > 0) {
            pathsData = pathsData.filter((path: any) => allowedPaths.includes(path.pathName))
        }

        data.paths = pathsData

        writeOutputFile(data, 'client', 'output/client', filename.split('.')[0])
    }
}
