import { InformationSquareIcon } from "@navikt/aksel-icons";
import { InfoCard, LocalAlert } from "@navikt/ds-react";
import type { AllErrors } from "../api/apiService";
import type { BackendError, NoDataError } from "../types/Error";

export type ErrorHandlerProps = {
	error: AllErrors | null;
	navnError: AllErrors | null;
};

function isBackendError(error: AllErrors): error is BackendError {
	return error && "meldingFraBackend" in error;
}

function isNoDataError(error: AllErrors): error is NoDataError {
	return error && "name" in error && error.name === "NoDataError";
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
			{navnError && isNoDataError(navnError) ? (
				<InfoCard data-color="info">
					<InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
						<InfoCard.Title>{navnErrorText(navnError)}</InfoCard.Title>
					</InfoCard.Header>
				</InfoCard>
			) : navnError ? (
				<LocalAlert status="error" role="alert">
					<LocalAlert.Header>
						<LocalAlert.Title>{navnErrorText(navnError)}</LocalAlert.Title>
					</LocalAlert.Header>
				</LocalAlert>
			) : null}
			{error && !navnError && isNoDataError(error) ? (
				<InfoCard data-color="info">
					<InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
						<InfoCard.Title>{skattekortErrorText(error)}</InfoCard.Title>
					</InfoCard.Header>
				</InfoCard>
			) : error && !navnError ? (
				<LocalAlert status="error" role="alert">
					<LocalAlert.Header>
						<LocalAlert.Title>{skattekortErrorText(error)}</LocalAlert.Title>
					</LocalAlert.Header>
				</LocalAlert>
			) : null}
		</>
	);
}
