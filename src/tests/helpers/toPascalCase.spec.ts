/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { toPascalCase } from '../../helpers/toPascalCase';

describe('toPascalCase()', () => {
	describe('passing "name of the variable"', () => {
		it('expects to return "NameOfTheVariable"', () => {
			expect(toPascalCase('name of the variable')).toBe('NameOfTheVariable');
		});
	});

	describe('passing "NAME OF THE VARIABLE"', () => {
		it('expects to return "NameOfTheVariable"', () => {
			expect(toPascalCase('NAME OF THE VARIABLE')).toBe('NameOfTheVariable');
		});
	});
});
