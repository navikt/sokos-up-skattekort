import { zodResolver } from "@hookform/resolvers/zod";
import { EraserIcon, MagnifyingGlassIcon } from "@navikt/aksel-icons";
import {
	Alert,
	Box,
	Button,
	ExpansionCard,
	Heading,
	Loader,
	TextField,
	VStack,
} from "@navikt/ds-react";
import type { AxiosError } from "axios";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFetchSkattekort } from "../api/apiService";
import Innhold from "../components/Innhold";
import type { Skattekort } from "../types/schema/SkattekortSchema";
import {
	type SokParameter,
	SokParameterSchema,
} from "../types/schema/SokParameter";
import styles from "./Sok.module.css";

type BackendError = {
	statusCode?: number;
	status?: number;
	message?: string;
};

function formaterFnr(fnr: string) {
	return fnr.replaceAll(/\D/g, "");
}

function isNullOrEmpty(data: Skattekort[] | undefined) {
	return !data || data.length === 0;
}

function menneskeleseligFeilmelding(error: AxiosError | BackendError | Error) {
	const status =
		(error as AxiosError).response?.status ??
		(error as BackendError).statusCode ??
		(error as BackendError).status;

	if (status && 300 <= status && status < 400) {
		return "Det ser ut til at det er en feil i kommunikasjonen med skattekort-tjenesten.";
	} else if (status && 400 <= status && status < 500) {
		return "Det ser ut til at det er en feil i forespørselen. Sjekk at fødselsnummeret er korrekt og prøv igjen.";
	} else if (status && status >= 500) {
		return "Det ser ut til at det er en feil i skattekort-tjenesten.";
	} else {
		return "Det oppsto en uventet feil. Prøv igjen senere.";
	}
}

export default function Sok() {
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
		<div>
			{false &&
				"data:" +
					JSON.stringify(data, null, 2) +
					"error:" +
					JSON.stringify(error, null, 2) +
					"isLoading:" +
					JSON.stringify(isLoading, null, 2) +
					"isSubmit:" +
					JSON.stringify(isSubmit, null, 2)}

			{error && (
				<Alert
					variant="error"
					role="alert"
					className={styles["alert-full-width"]}
				>
					Noe er galt. {menneskeleseligFeilmelding(error)} Legg inn sak i porten
					hvis problemet vedvarer.
				</Alert>
			)}

			{isNullOrEmpty(data) && isSubmit && !isLoading && !error && (
				<Alert
					variant="info"
					role="alert"
					className={styles["alert-full-width"]}
				>
					Ingen treff for oppgitt fnr
				</Alert>
			)}
			<Heading spacing level="1" size="large" align={"center"}>
				Skattekort
			</Heading>
			<Box paddingInline={{ sm: "0", md: "32" }} paddingBlock="0 4">
				<VStack gap="4">
					<Box
						padding="6"
						background={"surface-alt-1-subtle"}
						borderRadius="large"
					>
						<form onSubmit={handleSubmit(handleSokSubmit)}>
							<VStack gap={"4"}>
								<Box>
									<TextField
										{...register("fnr")}
										size={"small"}
										autoComplete={"off"}
										htmlSize={30}
										label="Fødselsnummer"
										error={errors.fnr?.message}
										onPaste={(
											event: React.ClipboardEvent<HTMLInputElement>,
										) => {
											event.preventDefault();
											const fraUtklippstavle =
												event.clipboardData.getData("text");
											const bareSiffer = formaterFnr(fraUtklippstavle);
											setValue("fnr", bareSiffer);
										}}
										// eslint-disable-next-line jsx-a11y/no-autofocus
										autoFocus
									/>
								</Box>
								<Box>
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

									<Button
										disabled={isLoading}
										variant="secondary"
										size={"small"}
										type="button"
										icon={<EraserIcon aria-hidden={"true"} />}
										iconPosition={"right"}
										title={"Reset søk"}
										onClick={(e) => {
											e.preventDefault();
											handleSokReset();
										}}
									>
										Nullstill søk
									</Button>
								</Box>
							</VStack>
						</form>
					</Box>
				</VStack>
			</Box>
			{isLoading && (
				<div className={styles.center}>
					<Loader size="3xlarge" title="Henter data..." />
				</div>
			)}
			{data?.map((skattekort) => (
				<div key={skattekort.identifikator} className={styles["box"]}>
					<ExpansionCard aria-label="Demo med bare tittel">
						<ExpansionCard.Header>
							<ExpansionCard.Title as="h4" size="small">
								Skattekort {skattekort.inntektsaar}. Utstedt{" "}
								{skattekort.utstedtDato}.
							</ExpansionCard.Title>
						</ExpansionCard.Header>
						<ExpansionCard.Content>
							<Innhold skattekort={skattekort} />
						</ExpansionCard.Content>
					</ExpansionCard>
				</div>
			))}
		</div>
	);
}
