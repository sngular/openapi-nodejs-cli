/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { DocumentListWithNoRepeatedOperationIds } from '../mocks/DocumentListWithNoRepeatedOperationIds.js';
import { DocumentListWithRepeatedOperationIds } from '../mocks/DocumentListWithRepeatedOperationIds.js';
import { hasRepeatedOperationIdErrors } from '../../helpers/hasRepeatedOperationIdErrors.js';

describe('checkRepeatedOperationIdErrors()', () => {
	describe('passing sample DataObject without repeated operationIds', () => {
		it('should return true', () => {
			expect(hasRepeatedOperationIdErrors(DocumentListWithRepeatedOperationIds)).toBeTruthy();
		});
	});

	describe('passing sample DataObject without repeated operationIds', () => {
		it('should return false', () => {
			expect(hasRepeatedOperationIdErrors(DocumentListWithNoRepeatedOperationIds)).toBeFalsy();
		});
	});
});
