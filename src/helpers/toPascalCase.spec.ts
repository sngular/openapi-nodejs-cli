import { toPascalCase } from "./toPascalCase";

describe("toPascalCase()", () => {
  describe('passing "name of the variable"', () => {
    it('expects to return "NameOfTheVariable"', () => {
      expect(toPascalCase("name of the variable")).toBe("NameOfTheVariable");
    });
  });

  describe('passing "NAME OF THE VARIABLE"', () => {
    it('expects to return "NameOfTheVariable"', () => {
      expect(toPascalCase("NAME OF THE VARIABLE")).toBe("NameOfTheVariable");
    });
  });
});
