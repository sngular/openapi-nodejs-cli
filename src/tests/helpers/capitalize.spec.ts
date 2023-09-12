/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { capitalize } from '../../helpers/capitalize';

describe('capitalize()', () => {
	describe('passing "name"', () => {
		it('expects to return "Name"', () => {
			expect(capitalize('name')).toBe('Name');
		});
	});

	describe('passing "NAME"', () => {
		it('expects to return "Name"', () => {
			expect(capitalize('NAME')).toBe('Name');
		});
	});
});
