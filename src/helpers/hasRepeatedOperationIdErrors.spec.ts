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
