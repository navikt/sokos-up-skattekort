import { ExpansionCard, Skeleton, VStack } from "@navikt/ds-react";
import type { Skattekort } from "../types/schema/SkattekortResponseDTOSchema";
import Skattekortdata from "./Skattekortdata";

export type ShowSkattekortProps = {
	data: Skattekort[] | undefined;
	isLoading: boolean;
};

export default function ShowSkattekort({
	data,
	isLoading,
}: Readonly<ShowSkattekortProps>) {
	return (
		<>
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
							<Skattekortdata skattekort={skattekort} />
						</ExpansionCard.Content>
					</ExpansionCard>
				</VStack>
			))}
		</>
	);
}
