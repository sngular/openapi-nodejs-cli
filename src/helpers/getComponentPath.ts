/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { isUrl } from "./isUrl";

export const getComponentPath = (
  refString: string,
  pathToSpec: string
): string | null => {
  const schemaRegExp = /^((https?:?)?\/\/)/g;

  const refValue: string = refString
    .split(":")
    .slice(1)
    .join(":")
    .replaceAll('"', "");

  const methodMatches = refValue.match(schemaRegExp);

  let schema: string = "";

  if (isUrl(refValue) && methodMatches) {
    schema = methodMatches[0];
    if (schema === "//") {
      return [pathToSpec.split(":")[0], refValue.split("#")[0]].join(":");
    } else if (schema === "http://" || schema === "https://") {
      return refString
        .split(":")
        .slice(1)
        .map((slug: string) => slug.replaceAll('"', ""))
        .join(":")
        .split("#")[0];
    }
  } else if (refValue.includes("#") && !refValue.startsWith("#")) {
    const componentsBasePath = pathToSpec.split("/").slice(0, -1).join("/");
    return [componentsBasePath, refValue.split("#")[0]].join("/");
  }

  return null;
};
