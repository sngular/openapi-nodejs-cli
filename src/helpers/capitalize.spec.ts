import { capitalize } from "./";

describe("capitalize()", () => {
  describe('passing "name"', () => {
    it('expects to return "Name"', () => {
      expect(capitalize("name")).toBe("Name");
    });
  });

  describe('passing "NAME"', () => {
    it('expects to return "Name"', () => {
      expect(capitalize("NAME")).toBe("Name");
    });
  });
});
