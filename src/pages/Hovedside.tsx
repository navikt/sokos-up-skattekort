import { zodResolver } from "@hookform/resolvers/zod";
import { EraserIcon, MagnifyingGlassIcon } from "@navikt/aksel-icons";
import {
	Alert,
	BodyShort,
	Box,
	Button,
	CopyButton,
	ExpansionCard,
	Heading,
	HelpText,
	HStack,
	Label,
	Skeleton,
	TextField,
	VStack,
} from "@navikt/ds-react";
import type { AxiosError } from "axios";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { ZodError } from "zod";
import { useFetchNavn, useFetchSkattekort } from "../api/apiService";
import Skattekortdata from "../components/Skattekortdata";
import type { BackendError, NoNameError } from "../types/Error";
import type { Skattekort } from "../types/schema/SkattekortResponseDTOSchema";
import {
	type SokParameter,
	SokParameterSchema,
} from "../types/schema/SokParameter";
import styles from "./Hovedside.module.css";

function formaterFnr(fnr: string) {
	return fnr.replaceAll(/\D/g, "");
}

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
	const {
		register,
		handleSubmit,
		trigger,
		reset,
		setValue,
		formState: { errors },
	} = useForm<SokParameter>({
		resolver: zodResolver(SokParameterSchema),
	});
	const { data, error, isLoading } = useFetchSkattekort(fnr);
	const {
		data: navn,
		error: navnError,
		isLoading: navnIsLoading,
	} = useFetchNavn(fnr);

	function handleSokReset() {
		setIsSubmit(false);
		setFnr("");
		reset();
	}

	function handleSokSubmit(parameter: SokParameter) {
		setIsSubmit(true);
		const fnr = parameter.fnr ?? "";
		setFnr(fnr);
	}

	return (
		<div className={styles.page}>
			<VStack gap="space-16">
				<Heading spacing level="1" size="large" align={"center"}>
					Skattekort
				</Heading>
				<VStack gap="space-24">
					<Box
						padding="6"
						background={"surface-alt-1-subtle"}
						borderRadius="large"
					>
						<form onSubmit={handleSubmit(handleSokSubmit)}>
							<VStack gap={"4"}>
								<HStack justify="space-between">
									<TextField
										{...register("fnr")}
										size={"small"}
										autoComplete={"off"}
										htmlSize={30}
										maxLength={11}
										label="Gjelder"
										error={errors.fnr?.message}
										onPaste={(
											event: React.ClipboardEvent<HTMLInputElement>,
										) => {
											event.preventDefault();
											const fraUtklippstavle =
												event.clipboardData.getData("text/plain");
											const bareSiffer = formaterFnr(fraUtklippstavle);
											setValue("fnr", bareSiffer);
										}}
										// eslint-disable-next-line jsx-a11y/no-autofocus
										autoFocus
									/>
									<HelpText title="Hvordan søke etter skattekort">
										Søk etter skattekort ved å oppgi fødselsnummer.
									</HelpText>
								</HStack>
								<HStack gap="space-16" justify="end">
									<Button
										disabled={isLoading}
										variant="secondary"
										size={"small"}
										type="button"
										icon={<EraserIcon aria-hidden={"true"} />}
										iconPosition={"right"}
										title={"Nytt søk"}
										onClick={(e) => {
											e.preventDefault();
											handleSokReset();
										}}
									>
										Nytt søk
									</Button>
									<Button
										disabled={isLoading}
										size={"small"}
										variant={"primary"}
										type={"submit"}
										title={"Søk"}
										iconPosition={"right"}
										icon={<MagnifyingGlassIcon aria-hidden={"true"} />}
										onClick={() => trigger()}
									>
										Søk
									</Button>
								</HStack>
							</VStack>
						</form>
					</Box>
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
