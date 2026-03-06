import { zodResolver } from "@hookform/resolvers/zod";
import { EraserIcon, MagnifyingGlassIcon } from "@navikt/aksel-icons";
import {
	Alert,
	Box,
	Button,
	ExpansionCard,
	Heading,
	HelpText,
	HStack,
	Page,
	Skeleton,
	TextField,
	VStack,
} from "@navikt/ds-react";
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

function formaterFnr(fnr: string) {
	return fnr.replaceAll(/\D/g, "");
}

function isNullOrEmpty(data: Skattekort[] | undefined) {
	return !data || data.length === 0;
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
		<Page>
			<VStack gap="space-16">
				<Heading spacing level="1" size="large" align={"center"}>
					Skattekort
				</Heading>
				<Page.Block width="md">
					{isNullOrEmpty(data) && isSubmit && !isLoading && !error && (
						<Alert variant="info" role="alert">
							Ingen treff for oppgitt fnr
						</Alert>
					)}

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
										label="Gjelder"
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
									<HelpText
										placement="top-end"
										strategy="absolute"
										title="Hvor kommer dette fra?"
									>
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
					{error && (
						<Alert variant="error" role="alert">
							Det oppstod en feil i kommunikasjon med Skattekort-tjenesten. Legg
							inn sak i porten hvis problemet vedvarer.
						</Alert>
					)}
					{isLoading && (
						<VStack padding="space-8" gap="space-16">
							<Skeleton variant="rounded" height={90} />
							<Skeleton variant="rounded" height={90} />
							<Skeleton variant="rounded" height={90} />
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
									<Innhold skattekort={skattekort} />
								</ExpansionCard.Content>
							</ExpansionCard>
						</VStack>
					))}
				</Page.Block>
			</VStack>
		</Page>
	);
}
