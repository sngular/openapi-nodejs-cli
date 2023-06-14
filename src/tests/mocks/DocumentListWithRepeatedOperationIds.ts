export const DocumentListWithRepeatedOperationIds = [
	{
		tagName: undefined,
		document: {
			components: [],
			openapi: '3.0.2',
			info: [],
			servers: [],
			paths: [
				{
					route: '/kafka',
					methods: [
						{
							methodName: 'get',
							operationId: 'getSchemas',
						},
						{
							methodName: 'get',
							operationId: 'getSchemas',
						},
					],
				},
			],
		},
		description: undefined,
	},
];
