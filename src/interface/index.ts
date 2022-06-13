/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { writeOutputFile, log } from "../helpers";
import { DataObject } from "../types";

export const generateInterfaceCode = (
  data: DataObject,
  outputDir: string = "output"
) => {
  log("Generating interface code", "interfaces");

  Object.keys(data.components).forEach((key: string) => {
    writeOutputFile(
      { components: { [key]: data.components[key] } },
      "interfaces",
      `${outputDir}/interface`,
      key
    );
  });
};
