/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
/**
 * @description If the input starts with '#', returns an array containing the strings required to access the schema
 * @param {string} refValue
 * @returns {string[]}
 */
export function resolveSchemaName(refValue: string): string[] {
  if (!refValue.startsWith("#") && !refValue.includes("#")) {
    return [refValue];
  }

  return refValue.split("/").slice(1);
}
