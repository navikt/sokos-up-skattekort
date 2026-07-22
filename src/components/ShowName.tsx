import {
	BodyShort,
	Box,
	CopyButton,
	HStack,
	Label,
	Skeleton,
	VStack,
} from "@navikt/ds-react";

export type ShowNameProps = {
	fnr: string;
	navn: string | undefined;
	navnIsLoading: boolean;
};

function formatterFnr(fnr: string) {
	return `${fnr.substring(0, 6)} ${fnr.substring(6)}`;
}

export default function ShowName({
	fnr,
	navn,
	navnIsLoading,
}: Readonly<ShowNameProps>) {
	return (
		<>
			{navn && (
				<VStack padding="space-8">
					<Box
						background={"default"}
						padding="space-16"
						paddingInline="space-32"
						borderRadius="12"
					>
						<HStack>
							<HStack gap="space-16" align="center">
								<BodyShort size="medium">Søkeresultatet gjelder:</BodyShort>
								<Label>{navn},</Label>
								<Label>{formatterFnr(fnr)}</Label>
							</HStack>
							<CopyButton
								size={"medium"}
								copyText={fnr}
								iconPosition={"left"}
								title="Kopier fødselsnummer"
							/>
						</HStack>
					</Box>
				</VStack>
			)}
			{navnIsLoading && (
				<VStack padding="space-8">
					<Box background={"default"} padding="space-16" borderRadius="12">
						<Skeleton variant="text" width="100%" />
					</Box>
				</VStack>
			)}
		</>
	);
}
