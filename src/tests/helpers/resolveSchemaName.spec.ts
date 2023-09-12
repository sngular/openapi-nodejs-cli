/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { resolveSchemaName } from '../../helpers/resolveSchemaName';

describe('resolveSchemaName()', () => {
	describe('passing a ref', () => {
		it('must return an array of the route', () => {
			const result: string[] = resolveSchemaName('kafka-config/components.yml#/components/schema');
			expect(result).toStrictEqual(['components.yml#', 'components', 'schema']);
		});
	});
	describe('passing a className', () => {
		it('must return an array of the route', () => {
			const result: string[] = resolveSchemaName('/components/schema');
			expect(result).toStrictEqual(['/components/schema']);
		});
	});
});
