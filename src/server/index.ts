/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { writeOutputFile, log } from "../helpers";
import { DataObject } from "../types";

export const generateServerCode = (
  data: DataObject,
  outputDir: string = "output",
  filename: string = "index",
  tagName: string = "",
  fileComments: string = ""
) => {
  log("Generating server code", "server");

  writeOutputFile(
    data,
    "server",
    `${outputDir}/server`,
    filename,
    tagName,
    fileComments
  );
};
