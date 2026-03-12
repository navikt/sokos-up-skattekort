import { Alert, ErrorSummary } from "@navikt/ds-react";
import type { AxiosError } from "axios";
import type { ZodError } from "zod";
import type { BackendError, NoNameError } from "../types/Error";

const DEBUG = false;

export type ErrorHandlerProps = {
	error: AxiosError | ZodError<unknown> | BackendError | null;
	navnError: AxiosError | ZodError<unknown> | BackendError | NoNameError | null;
};

function isBackendError(
	error: AxiosError | ZodError | BackendError | NoNameError,
): error is BackendError {
	return error && "meldingFraBackend" in error;
}

function isNoNameError(
	error: AxiosError | ZodError | BackendError | NoNameError,
): error is NoNameError {
	return error && "name" in error && error.name === "NoNameError";
}

function navnErrorText(
	error: AxiosError | ZodError<unknown> | BackendError | NoNameError,
) {
	if (isBackendError(error)) return error.meldingFraBackend;
	else if (isNoNameError(error)) return "Søket ga ingen treff";
	else
		return "Det oppstod en feil i kommunikasjon med PDL. Kan ikke vise navn.";
}

function skattekortErrorText(
	error: AxiosError | ZodError<unknown> | BackendError,
) {
	if (isBackendError(error)) return error.meldingFraBackend;
	else
		return "Det oppstod en feil i kommunikasjon med Skattekort-tjenesten. Legg inn sak i porten hvis problemet vedvarer.";
}
export default function Errorhandler({
	error,
	navnError,
}: Readonly<ErrorHandlerProps>) {
	return (
		<>
			{navnError && (
				<Alert
					variant={isNoNameError(navnError) ? "info" : "error"}
					role="alert"
				>
					{navnErrorText(navnError)}
				</Alert>
			)}
			{!navnError && error && (
				<Alert variant="error" role="alert">
					{skattekortErrorText(error)}
				</Alert>
			)}

			{DEBUG && navnError && (
				<ErrorSummary>
					<pre>hent-navn: {JSON.stringify(navnError, null, 2)}</pre>
				</ErrorSummary>
			)}
			{DEBUG && error && (
				<ErrorSummary>
					<pre>hent-skattekort: {JSON.stringify(error, null, 2)}</pre>
					{/[${[.*]/.exec(error?.message) && (
						<pre
							style={{
								fontSize: "tiny",
								whiteSpace: "pre-wrap",
								wordWrap: "break-word",
							}}
						>
							{JSON.stringify(JSON.parse(error.message), null, 2)}
						</pre>
					)}
				</ErrorSummary>
			)}
		</>
	);
}
