/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import Handlebars from 'handlebars';

export const setHandlebarsHelpers = () => {
	Handlebars.registerHelper('includes', (array: unknown[], element: unknown): boolean => {
		return array.includes(element);
	});

	Handlebars.registerHelper('capitalize', (text: string): string => {
		const characters = text.split('');
		characters[0] = characters[0].toUpperCase();
		return characters.join('');
	});

	Handlebars.registerHelper('removeSymbol', (text: string): string => {
		return text.replaceAll(/[^a-z]+/gim, '');
	});

	Handlebars.registerHelper('getType', (item: string | string[]): string => {
		if (Array.isArray(item)) {
			return item.join(' | ');
		}
		return item;
	});
};
