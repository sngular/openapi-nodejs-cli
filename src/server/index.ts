import axios from 'axios'
import YAML from 'yaml'
import {getSchemaRefPath, setHandlebarsHelpers, setSchema, writeOutputFile} from '../helpers'

setHandlebarsHelpers()

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
    let outputData: any = { data: {}, filename: '' }
    for (const url of urls) {
        const splitUrl = url.split('/')
        const server = splitUrl.slice(0, splitUrl.length - 1).join('/')
        const filename = splitUrl[splitUrl.length - 1]

        let response = await axios.get(url)

        const data = YAML.parse(response.data)

        let pathsData: any = Object.keys(data.paths).map(key => Object.keys(data.paths[key]).map(method => ({
            pathName: formatPathParam(key),
            method, ...data.paths[key][method]
        }))).flat()

        let filenames = [...new Set(pathsData.map((path: any) => getSchemaRefPath(path)))]

        for (const filename of filenames) {
            response = await axios.get(`${server}/${filename}`)
            const schemaData = {[filename as string]: YAML.parse(response.data)}

            pathsData = setSchema(pathsData, schemaData)
        }

        pathsData = Object.values({...pathsData})

        if (allowedPaths.length > 0) {
            pathsData = pathsData.filter((path: any) => allowedPaths.includes(path.pathName))
        }

        data.paths = pathsData
        if (outputData.data.paths !== undefined) {
            outputData.data.paths = [...Object.values(outputData.data.paths), ...Object.values(data.paths)]
        } else {
            outputData = {data, filename}
        }
    }

    writeOutputFile(outputData.data, 'server', 'output/server', 'index')
}