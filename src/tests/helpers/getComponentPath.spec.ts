/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { getComponentPath } from "../../helpers/getComponentPath.js";

describe("getComponentPath()", () => {
  describe("when $ref has no schema", () => {
    it("should return url with schema", () => {
      expect(
        getComponentPath(
          '"$ref":"//localhost/kafka-config/components.yml#/components/schema2"',
          "http://localhost/kafka.yaml"
        )
      ).toBe("http://localhost/kafka-config/components.yml");
    });
  });

  describe("when $ref has different schema", () => {
    it("should return url with schema", () => {
      expect(
        getComponentPath(
          '"$ref":"https://localhost/kafka-config/components.yml#/components/schema2"',
          "http://localhost/kafka.yaml"
        )
      ).toBe("https://localhost/kafka-config/components.yml");
    });
  });

  describe("when input document & $ref are relative", () => {
    it("should return relative path", () => {
      expect(
        getComponentPath(
          '"$ref":"kafka-config/components.yml#/components/schema"',
          "input/kafka.yaml"
        )
      ).toBe("input/kafka-config/components.yml");
    });
  });

  describe("when input document is remote & $ref is relative", () => {
    it("should return relative path", () => {
      expect(
        getComponentPath(
          '"$ref":"kafka-config/components.yml#/components/schema"',
          "http://localhost/kafka.yaml"
        )
      ).toBe("http://localhost/kafka-config/components.yml");
    });
  });
});
