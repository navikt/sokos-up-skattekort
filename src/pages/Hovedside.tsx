import {
	Alert,
	BodyShort,
	Box,
	CopyButton,
	ExpansionCard,
	Heading,
	HStack,
	Label,
	Skeleton,
	VStack,
} from "@navikt/ds-react";
import type { AxiosError } from "axios";
import { useState } from "react";
import type { ZodError } from "zod";
import { useFetchNavn, useFetchSkattekort } from "../api/apiService";
import Skattekortdata from "../components/Skattekortdata";
import Soek from "../components/Soek";
import type { BackendError, NoNameError } from "../types/Error";
import type { Skattekort } from "../types/schema/SkattekortResponseDTOSchema";
import styles from "./Hovedside.module.css";

function isNullOrEmpty(data: Skattekort[] | undefined) {
	return !data || data.length === 0;
}

function formatterFnr(fnr: string) {
	return fnr.substring(0, 6) + " " + fnr.substring(6);
}

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

export default function Hovedside() {
	const [isSubmit, setIsSubmit] = useState<boolean>(false);
	const [fnr, setFnr] = useState<string>("");

	const { data, error, isLoading } = useFetchSkattekort(fnr);
	const {
		data: navn,
		error: navnError,
		isLoading: navnIsLoading,
	} = useFetchNavn(fnr);

	return (
		<div className={styles.page}>
			<VStack gap="space-16">
				<Heading spacing level="1" size="large" align={"center"}>
					Skattekort
				</Heading>
				<VStack gap="space-24">
					<Soek
						setFnr={setFnr}
						setIsSubmit={setIsSubmit}
						isLoading={navnIsLoading}
					/>
					{navn && isNullOrEmpty(data) && isSubmit && !isLoading && !error && (
						<Alert variant="info" role="alert">
							Vi fant ingen opplysninger om skattekort på dette fødselsnummeret
						</Alert>
					)}
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
					{isLoading && (
						<VStack padding="space-8" gap="space-16">
							<Skeleton variant="rounded" height={90} />
							<Skeleton variant="rounded" height={90} />
							<Skeleton variant="rounded" height={90} />
						</VStack>
					)}
					{(navn || navnIsLoading) && (
						<VStack padding="space-8">
							{navn && (
								<Box
									background={"surface-default"}
									padding="space-16"
									paddingInline="space-32"
									borderRadius="large"
								>
									<HStack>
										<HStack gap="space-16" align="center">
											<BodyShort size="medium">
												Søkeresultatet gjelder:
											</BodyShort>
											<Label>{navn},</Label>
											<Label>{formatterFnr(fnr)}</Label>
										</HStack>
										<CopyButton
											size={"medium"}
											copyText={fnr}
											iconPosition={"left"}
										/>
									</HStack>
								</Box>
							)}
							{navnIsLoading && (
								<Box
									background={"surface-default"}
									padding="space-16"
									borderRadius="large"
								>
									<Skeleton variant="text" width="100%" />
								</Box>
							)}
							{navnError && (
								<Box
									background={"surface-default"}
									padding="space-16"
									borderRadius="large"
								>
									Fikk ikke noe svar fra PDL. Kan ikke vise navn.
								</Box>
							)}
						</VStack>
					)}

					{data?.map((skattekort) => (
						<VStack
							key={`${skattekort.opprettet}${skattekort.id}`}
							padding="space-8"
						>
							<ExpansionCard aria-label="Skattekort">
								<ExpansionCard.Header>
									<ExpansionCard.Title as="h4" size="small">
										Skattekort {skattekort.inntektsaar}.{" "}
										{(skattekort.utstedtDato ?? "") !== "" &&
											`Utstedt ${skattekort.utstedtDato}`}
									</ExpansionCard.Title>
								</ExpansionCard.Header>
								<ExpansionCard.Content>
									<Skattekortdata skattekort={skattekort} />
								</ExpansionCard.Content>
							</ExpansionCard>
						</VStack>
					))}
				</VStack>
			</VStack>
		</div>
	);
}
