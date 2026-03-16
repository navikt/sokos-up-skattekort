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
					{navn && (
						<Box
							background={"surface-default"}
							padding="space-16"
							paddingInline="space-32"
							borderRadius="large"
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
								/>
							</HStack>
						</Box>
					)}
				</VStack>
			)}
			{navnIsLoading && (
				<VStack padding="space-8">
					{navnIsLoading && (
						<Box
							background={"surface-default"}
							padding="space-16"
							borderRadius="large"
						>
							<Skeleton variant="text" width="100%" />
						</Box>
					)}
				</VStack>
			)}
		</>
	);
}
