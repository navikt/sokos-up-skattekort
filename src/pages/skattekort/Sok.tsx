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
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFetchSkattekort } from "../../api/apiService";
import { AlertWithCloseButton } from "../../components/AlertWithCloseButton";
import Innhold from "../../components/Innhold";
import {
	type SokParameter,
	SokParameterSchema,
} from "../../types/schema/SokParameter";
import styles from "./Sok.module.css";

function formaterFnr(fnr: string) {
	return fnr.replace(/\D/g, "");
}

export default function Sok() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isSubmit, setIsSubmit] = useState<boolean>(false);
	const [sokParameter, setSokParameter] = useState<SokParameter>({ fnr: "" });
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
	const { data, error } = useFetchSkattekort(fnr);

	function handleSokReset() {
		setSokParameter({ fnr: "" });
		setIsSubmit(false);
		setFnr("");
		reset();
	}

	function handleSokSubmit(parameter: SokParameter) {
		setIsSubmit(true);
		setSokParameter({ ...parameter });
		const fnr = parameter.fnr ?? "";
		setFnr(fnr);
	}

	return (
		<div>
			<Heading spacing level="1" size="large" align={"center"}>
				Skattekort
			</Heading>
			{!data && isSubmit && (
				<div>
					<Loader size="3xlarge" title="Henter data..." />
				</div>
			)}
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
										defaultValue={sokParameter.fnr}
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
					{isLoading && (
						<div>
							<Loader size="3xlarge" title="Henter data..." />
						</div>
					)}

					{!data && isSubmit && !isLoading && !error && (
						<Alert variant="error" role="alert">
							Ingen treff for org.nr. {sokParameter.fnr}
						</Alert>
					)}
					{error && (
						<AlertWithCloseButton variant="error" role="alert">
							{error}
						</AlertWithCloseButton>
					)}
				</VStack>
			</Box>
			{data?.map((skattekort, index) => (
				<div key={index} className={styles.result}>
					<ExpansionCard aria-label="Demo med bare tittel">
						<ExpansionCard.Header>
							<ExpansionCard.Title>
								Skattekort {skattekort.inntektsaar}. Utstedt{" "}
								{data.length - index}
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
