export interface IResponse<T> {
	meta: {
		code?: number;
		message?: string;
	};
	data: T;
}
