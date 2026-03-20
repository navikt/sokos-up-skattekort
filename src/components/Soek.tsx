import { zodResolver } from "@hookform/resolvers/zod";
import { EraserIcon, MagnifyingGlassIcon } from "@navikt/aksel-icons";
import {
	Box,
	Button,
	HelpText,
	HStack,
	TextField,
	VStack,
} from "@navikt/ds-react";
import type React from "react";
import { useForm } from "react-hook-form";
import { type SokParameter, SokParameterSchema } from "../types/SokParameter";

export type SoekProps = {
	setIsSubmit: (isSubmit: boolean) => void;
	setFnr: (fnr: string) => void;
	isLoading?: boolean;
};
function formaterFnr(fnr: string) {
	return fnr.replaceAll(/\D/g, "");
}
export default function Soek({
	setIsSubmit,
	setFnr,
	isLoading,
}: Readonly<SoekProps>) {
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

	function handleSoekReset() {
		setIsSubmit(false);
		setFnr("");
		reset();
	}
	function handleSoekSubmit(parameter: SokParameter) {
		setIsSubmit(true);
		const fnr = parameter.fnr ?? "";
		setFnr(fnr);
	}
	return (
		<Box padding="6" background={"surface-alt-1-subtle"} borderRadius="large">
			<form onSubmit={handleSubmit(handleSoekSubmit)}>
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
							onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
								event.preventDefault();
								const fraUtklippstavle =
									event.clipboardData.getData("text/plain");
								const bareSiffer = formaterFnr(fraUtklippstavle);
								setValue("fnr", bareSiffer);
							}}
							// eslint-disable-next-line jsx-a11y/no-autofocus
							autoFocus
						/>
						<HelpText placement="left" title="Om arbeidsflaten skattekort">
							Du kan se skattekort 24 mnd tilbake i tid.
							<br />
							For å se hvilken del av skattekortet som vil bli, eller er, brukt
							i en beregning må menypunktet "Skatt og trekk" og underpunktmeny
							"eSkattekort - Søk" i Økonomiportalen benyttes.
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
								handleSoekReset();
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
	);
}
