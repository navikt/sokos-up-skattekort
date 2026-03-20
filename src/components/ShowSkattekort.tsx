import { ExpansionCard, Skeleton, VStack } from "@navikt/ds-react";
import {
	type Skattekort,
	skattekortTittel,
} from "../types/SkattekortResponseDTOSchema";
import { toLocalDate } from "../util/norskFormat";
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
								{skattekortTittel(skattekort)} {skattekort.inntektsaar}.{" "}
								{(skattekort.utstedtDato ?? "") !== "" &&
									`Utstedt ${toLocalDate(skattekort.utstedtDato ?? "")}`}
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
