/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { log } from '../../helpers/log.js';

describe('log()', () => {
	it('console.log has been called', () => {
		// eslint-disable-next-line no-console
		console.log = jest.fn();
		log('Hello');
		// eslint-disable-next-line no-console
		expect(console.log).toHaveBeenCalled();
	});

	it("without type parameters, console.log receives 'INFO' log", () => {
		// eslint-disable-next-line no-console
		console.log = jest.fn();
		log('Log message');
		// eslint-disable-next-line no-console
		expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/\[INFO\].*Log message.*/));
	});

	it("with 'error' type parameters, console.log receives 'ERROR' log", () => {
		// eslint-disable-next-line no-console
		console.log = jest.fn();
		log('Log message', 'error');
		// eslint-disable-next-line no-console
		expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/\[ERROR\].*Log message.*/));
	});
});
