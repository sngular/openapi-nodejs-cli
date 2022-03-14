import fs from "fs"
import path from "path"
import process from "node:process"
import Handlebars from "handlebars"

export { setHandlebarsHelpers } from './handlebarsHelpers'

export const writeOutputFile = (data: any[], templateName: 'client' | 'server', outputDir: string = 'output', filename: string) => {
    if (!fs.existsSync(path.join(process.cwd(), outputDir))) {
        fs.mkdirSync(path.join(process.cwd(), outputDir), {recursive: true})
    }

    const source = fs.readFileSync(path.join(process.cwd(), `/src/templates/${templateName}.hbs`), 'utf-8')
    const template = Handlebars.compile(source)
    const output = template(data)

    fs.writeFileSync(path.join(process.cwd(), `/${outputDir}/${filename}.ts`), output, 'utf-8')
}

export const getSchemaRefPath = (item: any): any => {
    let schemaFilename
    for (const key of Object.keys(item)) {
        if (typeof item[key] !== 'object') {
            continue
        }

        if (!Object.keys(item).includes('schema')) {
            schemaFilename = getSchemaRefPath(item[key])

            if (schemaFilename !== undefined) {
                return schemaFilename
            }

            continue
        }

        if (!Object.keys(item.schema).includes('$ref')) {
            continue
        }

        schemaFilename = item.schema.$ref.split('#')[0]
    }

    return schemaFilename
}

export const setSchema = (item: any, schemaData: any): { [key: string]: any } => {
    const newItem: { [key: string]: any } = {}
    for (const key of Object.keys(item)) {
        if (typeof item[key] !== 'object') {
            newItem[key] = item[key]
            continue
        }

        if (!Object.keys(item).includes('schema')) {
            if (item[key] instanceof Array) {
                newItem[key] = item[key]
                continue
            }

            newItem[key] = setSchema(item[key], schemaData)
            continue
        }

        if (!Object.keys(item.schema).includes('$ref')) {
            newItem[key] = item[key]
            continue
        }

        const schemaFilename = item.schema.$ref.split('#')[0]
        if (Object.keys(schemaData).includes(schemaFilename)) {
            newItem.schema = {...item.schema, ...schemaData[schemaFilename].components.schema}
        }
    }

    return newItem
}
