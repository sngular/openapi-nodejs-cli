/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
export const log = (msg: string, type: string = "info"): void => {
  const time = new Date().toLocaleTimeString();
  // eslint-disable-next-line no-console
  console.log(`[${type.toUpperCase()}] ${time} - ${msg}`);
};
