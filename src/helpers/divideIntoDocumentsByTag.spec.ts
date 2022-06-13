/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { DataObjectWith2Tags } from "../../mocks/DataObjectWith2Tags";
import { DataObjectWithoutTags } from "../../mocks/DataObjectWithoutTags";

import { divideIntoDocumentsByTag } from "./divideIntoDocumentsByTag";

describe("divideIntoDocumentsByTag()", () => {
  describe("passing sample DataObject with 2 different tags", () => {
    it("expect to return 2 files to save", () => {
      expect(divideIntoDocumentsByTag(DataObjectWith2Tags).length).toBe(2);
    });
  });

  describe("passing sample DataObject without tags", () => {
    it("expect to return 1 file to save", () => {
      expect(divideIntoDocumentsByTag(DataObjectWithoutTags).length).toBe(1);
    });
  });
});
