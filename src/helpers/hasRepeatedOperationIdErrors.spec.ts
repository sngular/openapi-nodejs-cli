/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { DocumentListWithNoRepeatedOperationIds } from "../../mocks/DocumentListWithNoRepeatedOperationIds";
import { DocumentListWithRepeatedOperationIds } from "../../mocks/DocumentListWithRepeatedOperationIds";
import { hasRepeatedOperationIdErrors } from "./hasRepeatedOperationIdErrors";

describe("checkRepeatedOperationIdErrors()", () => {
  let exit: any;
  beforeAll(() => {
    exit = jest.spyOn(process, "exit");
  });
  describe("passing sample DataObject without repeated operationIds", () => {
    it("should return true", () => {
      expect(
        hasRepeatedOperationIdErrors(DocumentListWithRepeatedOperationIds)
      ).toBeTruthy();
    });
  });

  describe("passing sample DataObject without repeated operationIds", () => {
    it("should return false", () => {
      expect(
        hasRepeatedOperationIdErrors(DocumentListWithNoRepeatedOperationIds)
      ).toBeFalsy();
    });
  });
});
