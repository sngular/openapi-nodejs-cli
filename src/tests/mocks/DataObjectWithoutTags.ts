export const DataObjectWithoutTags = {
	components: {
		User: {
			type: 'object',
			required: ['id', 'name'],
			properties: {
				id: {
					type: 'integer',
				},
				name: {
					type: 'string',
				},
				email: {
					type: 'string',
				},
			},
		},
		Group: {
			type: 'object',
			required: ['id', 'name'],
			properties: {
				id: {
					type: 'integer',
				},
				name: {
					type: 'string',
				},
			},
		},
	},
	openapi: '3.0.2',
	info: {
		title: 'Kafka Cluster Management',
		version: '1.0',
	},
	servers: [
		{
			url: 'https://localhost/v1',
		},
	],
	paths: {
		'/users': {
			get: {
				operationId: 'getAll',
				responses: {
					'200': {
						description: 'OK',
						content: {
							'application/json': {
								user: {
									$ref: 'User',
								},
							},
						},
					},
					'400': {
						description: 'Bad Request',
					},
					'500': {
						description: 'Server Error',
					},
				},
			},
		},
		'/groups': {
			get: {
				operationId: 'getAllGroups',
				responses: {
					'200': {
						description: 'OK',
						content: {
							'application/json': {
								group: {
									$ref: 'Group',
								},
							},
						},
					},
					'400': {
						description: 'Bad Request',
					},
					'500': {
						description: 'Server Error',
					},
				},
			},
		},
		'/groups/{id}': {
			get: {
				operationId: 'getGroupById',
				parameters: [
					{
						name: 'id',
						in: 'path',
						description: 'group id to get',
						required: true,
						schema: {
							type: 'string',
						},
					},
				],
				responses: {
					'200': {
						description: 'OK',
						content: {
							'application/json': {
								group: {
									$ref: 'Group',
								},
							},
						},
					},
					'400': {
						description: 'Bad Request',
					},
					'500': {
						description: 'Server Error',
					},
				},
			},
		},
	},
};
