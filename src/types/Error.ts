export class BackendError extends Error {
	meldingFraBackend: string;

	constructor(meldingFraBackend: string) {
		super(meldingFraBackend);
		this.name = "BackendError";
		this.meldingFraBackend = meldingFraBackend;
	}
}
export class NoDataError extends Error {
	constructor() {
		super();
		this.name = "NoDataError";
	}
}

export class ApiError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ApiError";
	}
}

export class HttpStatusCodeError extends Error {
	statusCode: number;

	constructor(statusCode: number, message?: string) {
		super(message || `HTTP Error: ${statusCode}`);
		this.statusCode = statusCode;
		this.name = "HttpStatusCodeError";
	}
}
