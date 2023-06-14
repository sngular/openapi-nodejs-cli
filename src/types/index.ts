/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type DataObject = { [key: string]: any };

export type FileObject = {
	tagName?: string;
	document: DataObject;
};

export type MethodParameter = {
	name: string;
	in: string;
	description: string;
	required: boolean;
};
export type ResponseBody = {
	description: string;
	content: unknown;
};

export type Method = {
	methodName: string;
	operationId: string;
	tags?: string[];
	parameters: MethodParameter[];
	requestBody?: unknown;
	responses: { [status: string]: ResponseBody };
};

export type Path = {
	route: string;
	methods: Method[];
};
