import YAML from "yaml";
import {
  getFilenameAndServer,
  getSchemaData,
  getSchemaRefPath,
  getSpecificationFile,
  setSchema,
  writeOutputFile,
  log,
} from "../helpers";

const formatPathParam = (path: string): string => {
  return path
    .split("/")
    .map((element) => {
      if (element.match(/{(.*?)}/gi)) {
        return element.replace("{", ":").replace("}", "");
      } else {
        return element;
      }
    })
    .join("/");
};

export const generateServerCode = async (
  urls: string[],
  allowedPaths: string[] = []
) => {
  log("Generating server code", "server");
  let outputData: any = { data: {} };
  for (const url of urls) {
    const { server, filename } = getFilenameAndServer(url);
    log(`Getting OpenAPI specification file from ${url}`, "server");
    const { file, isUrl } = await getSpecificationFile(url);

    const data = YAML.parse(file);

    let pathsData: any = Object.keys(data.paths)
      .map((key) =>
        Object.keys(data.paths[key]).map((method) => ({
          pathName: formatPathParam(key),
          method,
          filename: filename.split(".")[0],
          ...data.paths[key][method],
        }))
      )
      .flat();

    let filenames = [
      ...new Set(pathsData.map((path: any) => getSchemaRefPath(path))),
    ];

    for (const filename of filenames) {
      log(`Getting schema file from ${server}/${filename}`, "server");
      const schemaData = await getSchemaData(
        filename as string,
        url,
        server,
        isUrl
      );
      pathsData = setSchema(pathsData, schemaData);
    }

    pathsData = Object.values(pathsData);

    if (allowedPaths.length > 0) {
      pathsData = pathsData.filter((path: any) =>
        allowedPaths.includes(path.pathName)
      );
    }

    data.paths = pathsData;
    if (outputData.data.paths !== undefined) {
      outputData.data.paths = [
        ...Object.values(outputData.data.paths),
        ...Object.values(data.paths),
      ];
    } else {
      outputData = { data };
    }
    writeOutputFile(outputData.data, "server", "output/server", "index");
  }
};
