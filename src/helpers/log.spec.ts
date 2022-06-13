/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { log } from "./log";

describe("log()", () => {
  it("console.log has been called", () => {
    console.log = jest.fn();
    log("Hello");
    expect(console.log).toHaveBeenCalled();
  });

  it("without type parameters, console.log receives 'INFO' log", () => {
    console.log = jest.fn();
    log("Log message");
    expect(console.log).toHaveBeenCalledWith(
      expect.stringMatching(/\[INFO\].*Log message.*/)
    );
  });

  it("with 'error' type parameters, console.log receives 'ERROR' log", () => {
    console.log = jest.fn();
    log("Log message", "error");
    expect(console.log).toHaveBeenCalledWith(
      expect.stringMatching(/\[ERROR\].*Log message.*/)
    );
  });
});
