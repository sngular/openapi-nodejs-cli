import { EMPTY_TAG } from "../const";
import { DataObject, FileObject, Method, Path } from "../types";
import { parseDocument } from "./documentParser";

export function divideIntoDocumentsByTag(data: DataObject): FileObject[] {
  const tags: (string|undefined)[] = getAllTagsInDataObject(data);


  if (tags.length > 0) {
    const documentsByTag = tags.map(tag => {
      const foundTagInfo = data.tags?.find((item: { name: string, description: string }) => item.name === tag);
      return ({
        tagName: tag,
        document: generatesDocumentByTag(data, tag),
        description: foundTagInfo?.description || undefined
      })
    });

    return documentsByTag;
  } else {
    return [{
      document: generatesDocumentWithoutTag(data)
    }]
  }
}

function getAllTagsInDataObject(data: DataObject): (string|undefined)[] {
  const tags: (string|undefined)[] = [];
  Object.keys(data.paths)
    .map(path => data.paths[path])
    .map(operations => {
      return Object.keys(operations).map(operationKey => operations[operationKey]).forEach((method: Method) => {

        if (!method.tags) {
          if (!tags.includes(EMPTY_TAG)) {
            tags.push(EMPTY_TAG);
          }
        }
        method.tags && method.tags.forEach((tag: string) => {
          if (!tags.includes(tag)) {
            tags.push(tag);
          }
        })
      })
    });
  return tags;
}

function generatesDocumentByTag(data: DataObject, tag: string|undefined): DataObject {
  const document = parseDocument(JSON.parse(JSON.stringify(data)));
  document.paths = document.paths.filter((path: Path) => {
    if (tag === EMPTY_TAG) {
      return path.methods.filter((method: Method) => !method.tags).length > 0
    }
    return path.methods.filter((method: Method) => method.tags && method.tags.includes(tag)).length > 0
  }).map((path: Path) => ({
    ...path,
    methods: tag === EMPTY_TAG ?
      path.methods.filter((method: Method) => !method.tags) :
      path.methods.filter((method: Method) => method.tags && method.tags.includes(tag))
  }));
  return document;
}

function generatesDocumentWithoutTag(data: DataObject): DataObject {
  const document = parseDocument(JSON.parse(JSON.stringify(data)));
  return document;
}