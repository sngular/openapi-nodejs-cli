import axios from 'axios'
import YAML from 'yaml'
import { getFilenameAndServer, getSchemaRefPath, getSpecificationFile, setSchema, writeOutputFile } from "../helpers";
import fs from "fs"
import {join} from "path"

const formatPathParam = (path: string): string => {
    return path.split('/').map(element => {
        if (element.match(/{(.*?)}/gi)) {
            return element.replace('{', ':').replace('}', '')
        } else {
            return element
        }
    }).join('/')
}

export const generateServerCode = async (urls: string[], allowedPaths: string[] = []) => {
    let outputData: any = {data: {}}
    for (const url of urls) {
        const { server, filename } = getFilenameAndServer(url)
        const { file, isUrl } = await getSpecificationFile(url)

        const data = YAML.parse(file)

        let pathsData: any = Object.keys(data.paths).map(key => Object.keys(data.paths[key]).map(method => ({
            pathName: formatPathParam(key),
            method,
            filename: filename.split('.')[0],
            ...data.paths[key][method]
        }))).flat()

        let filenames = [...new Set(pathsData.map((path: any) => getSchemaRefPath(path)))]

        for (const filename of filenames) {
            if (isUrl) {
                const response = await axios.get(`${server}/${filename}`)
                const schemaData = {[filename as string]: YAML.parse(response.data)}

                pathsData = setSchema(pathsData, schemaData)
            } else {
                const newUrl = url.split('/').slice(0, -1).join('/')
                const file = fs.readFileSync(join(newUrl, (filename as string)), "utf-8")
                const schemaData = {[filename as string]: YAML.parse(file)}

                pathsData = setSchema(pathsData, schemaData)
            }
        }

        pathsData = Object.values(pathsData)

        if (allowedPaths.length > 0) {
            pathsData = pathsData.filter((path: any) => allowedPaths.includes(path.pathName))
        }

        data.paths = pathsData
        if (outputData.data.paths !== undefined) {
            outputData.data.paths = [...Object.values(outputData.data.paths), ...Object.values(data.paths)]
        } else {
            outputData = {data}
        }
    }

    writeOutputFile(outputData.data, 'server', 'output/server', 'index')
}