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
