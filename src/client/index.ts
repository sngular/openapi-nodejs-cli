import YAML from "yaml";
import {
    getFilenameAndServer,
    getSchemaData,
    getSchemaRefPath,
    getSpecificationFile,
    setSchema,
    writeOutputFile
} from "../helpers";

const pathParamRegex = /{(.*?)}/gi

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
    for (const url of urls) {
        const { server, filename } = getFilenameAndServer(url)
        const { file, isUrl } = await getSpecificationFile(url)

        const data = YAML.parse(file)

        let pathsData: any = Object.keys(data.paths).map(key => Object.keys(data.paths[key]).map(method => ({
            pathName: formatPathParam(key),
            method, ...data.paths[key][method]
        }))).flat()

        let filenames = [...new Set(pathsData.map((path: any) => getSchemaRefPath(path)))]

        for (const filename of filenames) {
            const schemaData = await getSchemaData((filename as string), url, server, isUrl)
            pathsData = setSchema(pathsData, schemaData)
        }

        pathsData = Object.values(pathsData)

        if (allowedPaths.length > 0) {
            pathsData = pathsData.filter((path: any) => allowedPaths.includes(path.pathName))
        }

        data.paths = pathsData

        writeOutputFile(data, 'client', 'output/client', filename.split('.')[0])
    }
}
