/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import axios from 'axios';
import fs from 'fs';

export async function getComponentsFiles(filePath: string, isUrl: boolean) {
	if (isUrl) {
		const response = await axios.get(filePath);
		return response.data;
	}
	return fs.readFileSync(filePath, 'utf-8');
}
