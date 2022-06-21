/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import axios, { AxiosRequestConfig } from "axios";
import fs, { PathOrFileDescriptor } from "fs";
import { getComponentsFiles } from "./getComponentsFiles";

describe("getComponentsFiles()", () => {
  describe("passing an URL", () => {
    it("expects to fetch the file using axios", () => {
      const spy = jest
        .spyOn(axios, "get")
        .mockImplementation(
          (
            url: string,
            config?: AxiosRequestConfig<unknown> | undefined
          ): Promise<unknown> => {
            return new Promise((resolve) => {
              // eslint-disable-next-line no-console
              console.log(url, config, resolve);
            });
          }
        );
      getComponentsFiles("http://localhost", true);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("passing a local file path", () => {
    it("expects to fetch the file using fs", () => {
      const spy = jest
        .spyOn(fs, "readFileSync")
        .mockImplementation(
          (
            filePath: PathOrFileDescriptor,
            encoding:
              | BufferEncoding
              | (unknown & { flag?: string | undefined })
              | null
              | undefined
          ): string => {
            // eslint-disable-next-line no-console
            console.log(filePath, encoding);
            return "done";
          }
        );
      getComponentsFiles("/route/to/file", false);
      expect(spy).toHaveBeenCalled();
    });
  });
});
