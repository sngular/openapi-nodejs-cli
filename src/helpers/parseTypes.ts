/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { DataObject } from '../types';
import { capitalize } from './capitalize';
import { resolveSchemaName } from './resolveSchemaName';

export function parseTypes(schema: DataObject): string | string[] | undefined {
	if (schema.oneOf) {
		return schema.oneOf.map((item: DataObject) => parseTypes(item));
	}

	if (schema.type) {
		switch (schema.type) {
			case 'integer':
				return 'number';

			case 'array':
				if (schema.items.type) {
					return `${parseTypes(schema.items)}[]`;
				}

				if (schema.items['$ref']) {
					return capitalize(`${resolveSchemaName(schema.items['$ref']).slice(-1)[0]}[]`);
				}
				break;
			default:
				return schema.type;
		}
	}

	if (schema['$ref']) {
		if (Array.isArray(schema['$ref'])) {
			return schema['$ref'];
		}
		const schemaName = resolveSchemaName(schema['$ref']);
		return capitalize(schemaName.slice(-1)[0]);
	}
}
