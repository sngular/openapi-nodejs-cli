import { parseTypes } from "./parseTypes";

describe("parseTypes()", () => {
  describe("references to a component", () => {
    describe("single item", () => {
      const schema = {
        $ref: "one-of-config/components.yml#/components/user",
      };
      it("must return capitalized component name", () => {
        expect(parseTypes(schema)).toBe("User");
      });
    });

    describe("array of items", () => {
      const schema = {
        type: "array",
        items: {
          $ref: "one-of-config/components.yml#/components/user",
        },
      };
      it("must return capitalized component name", () => {
        expect(parseTypes(schema)).toBe("User[]");
      });
    });
  });

  describe("string", () => {
    describe("single item", () => {
      const schema = {
        type: "string",
      };
      it("must return string type without changes", () => {
        expect(parseTypes(schema)).toBe("string");
      });
    });

    describe("array of items", () => {
      const schema = {
        type: "array",
        items: {
          type: "string",
        },
      };
      it("must return array of string", () => {
        expect(parseTypes(schema)).toBe("string[]");
      });
    });
  });

  describe("integer", () => {
    describe("single item", () => {
      const schema = {
        type: "integer",
      };
      it("must return number type", () => {
        expect(parseTypes(schema)).toBe("number");
      });
    });

    describe("array of items", () => {
      const schema = {
        type: "array",
        items: {
          type: "integer",
        },
      };
      it("must return array of number", () => {
        expect(parseTypes(schema)).toBe("number[]");
      });
    });
  });

  describe("boolean", () => {
    describe("single item", () => {
      const schema = {
        type: "boolean",
      };
      it("must return boolean type without changes", () => {
        expect(parseTypes(schema)).toBe("boolean");
      });
    });

    describe("array of items", () => {
      const schema = {
        type: "array",
        items: {
          type: "boolean",
        },
      };
      it("must return array of boolean", () => {
        expect(parseTypes(schema)).toBe("boolean[]");
      });
    });
  });

  describe("oneOf", () => {
    describe("component or array of components", () => {
      const schema = {
        oneOf: [
          { $ref: "one-of-config/components.yml#/components/user" },
          {
            type: "array",
            items: { $ref: "one-of-config/components.yml#/components/user" },
          },
        ],
      };
      it("must return array of oneOf passed types", () => {
        expect(parseTypes(schema)).toEqual(["User", "User[]"]);
      });
    });
  });

  describe("previously parsed types in array as $ref", () => {
    const schema = {
      ["$ref"]: ["User", "User[]"],
    };

    it("must return array of oneOf passed types", () => {
      expect(parseTypes(schema)).toEqual(["User", "User[]"]);
    });
  });
});
