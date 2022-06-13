/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
export function toPascalCase(string: string): string {
  return string
    .replace(
      /([a-zA-Z0-9+])*/g,
      (m) => m.charAt(0).toUpperCase() + m.substring(1).toLowerCase()
    )
    .replace(/[^a-zA-Z0-9]/g, "");
}
