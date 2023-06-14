/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { writeOutputFile, log } from '../helpers';
import { cleanComponents, getUsedComponents } from '../helpers/usedComponents';
import { DataObject } from '../types';

export const generateClientCode = (
	data: DataObject,
	angular = false,
	javascript = false,
	outputDir = 'output',
	tagname = 'custom',
	fileComments = ''
) => {
	log('Generating client code', 'client');

	const usedComponents = getUsedComponents(data).map((component: string) => component.replace(/([^a-zA-Z]+)/g, ''));
	data.components = cleanComponents(data.components, usedComponents);

	if (javascript) {
		writeOutputFile(data, 'javascriptClient', `${outputDir}/client`, tagname, tagname, fileComments, 'js');
	} else if (angular) {
		writeOutputFile(data, 'angularClient', `${outputDir}/client`, `${tagname}.service`, tagname, fileComments, 'ts');
	} else {
		writeOutputFile(data, 'client', `${outputDir}/client`, tagname, tagname, fileComments, 'ts');
	}
};
