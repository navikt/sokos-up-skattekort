import { Alert, ErrorSummary } from "@navikt/ds-react";
import type { AxiosError } from "axios";
import type { ZodError } from "zod";
import type { BackendError, NoDataError } from "../types/Error";

const DEBUG = false;
type AllErrors = AxiosError | ZodError<unknown> | BackendError | NoDataError;
type OtherError = AxiosError | ZodError<unknown> | BackendError;

export type ErrorHandlerProps = {
	error: OtherError | null;
	navnError: OtherError | NoDataError | null;
};

function isBackendError(error: AllErrors): error is BackendError {
	return error && "meldingFraBackend" in error;
}

function isNoDataError(error: AllErrors): error is NoDataError {
	return error && "name" in error && error.name === "NoDataError";
}

function isNotNoDataError(error: AllErrors): error is OtherError {
	return !isNoDataError(error);
}

function navnErrorText(error: AllErrors) {
	if (isBackendError(error)) return error.meldingFraBackend;
	else if (isNoDataError(error)) return "Søket ga ingen treff";
	else
		return "Det oppstod en feil i kommunikasjon med PDL. Kan ikke vise navn.";
}

function skattekortErrorText(error: AllErrors) {
	if (isBackendError(error)) return error.meldingFraBackend;
	else if (isNoDataError(error))
		return "Vi fant ingen opplysninger om skattekort på dette fødselsnummeret";
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
					variant={isNoDataError(navnError) ? "info" : "error"}
					role="alert"
				>
					{navnErrorText(navnError)}
				</Alert>
			)}
			{error && !navnError && (
				<Alert variant={isNoDataError(error) ? "info" : "error"} role="alert">
					{skattekortErrorText(error)}
				</Alert>
			)}

			{DEBUG && navnError && isNotNoDataError(navnError) && (
				<ErrorSummary>
					<pre>hent-navn: {JSON.stringify(navnError, null, 2)}</pre>
				</ErrorSummary>
			)}
			{DEBUG && error && isNotNoDataError(error) && (
				<ErrorSummary>
					<pre>hent-skattekort: {JSON.stringify(error, null, 2)}</pre>
					{"message" in error && /[${[.*]/.exec(error?.message) && (
						<pre>{JSON.stringify(JSON.parse(error.message), null, 2)}</pre>
					)}
				</ErrorSummary>
			)}
		</>
	);
}
