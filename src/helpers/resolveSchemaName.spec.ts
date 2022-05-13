import { resolveSchemaName } from "./resolveSchemaName";

describe("resolveSchemaName()", () => {
  describe("passing a ref", () => {
    it("must return an array of the route", () => {
      const result: string[] = resolveSchemaName(
        "kafka-config/components.yml#/components/schema"
      );
      expect(result).toStrictEqual(["components.yml#", "components", "schema"]);
    });
  });
  describe("passing a className", () => {
    it("must return an array of the route", () => {
      const result: string[] = resolveSchemaName("/components/schema");
      expect(result).toStrictEqual(["/components/schema"]);
    });
  });
});
