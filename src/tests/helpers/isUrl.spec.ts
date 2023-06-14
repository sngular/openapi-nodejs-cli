/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { isUrl } from "../../helpers/isUrl.js";

describe("isUrl()", () => {
  describe("passing http url", () => {
    it("should return true", () => {
      expect(isUrl("http://localhost/kafka.yaml")).toBeTruthy();
    });
  });

  describe("passing https url", () => {
    it("should return true", () => {
      expect(isUrl("https://localhost/kafka.yaml")).toBeTruthy();
    });
  });
  describe("passing url without schema", () => {
    it("should return true", () => {
      expect(isUrl("//localhost/kafka.yaml")).toBeTruthy();
    });
  });
  describe("passing local path", () => {
    it("should return false", () => {
      expect(isUrl("/home/user/kafka.yaml")).toBeFalsy();
    });
  });
});
