import { BodyShort, HStack, Label, Table, VStack } from "@navikt/ds-react";
import {
	menneskeleseligKilde,
	type Skattekort,
	Trekkode,
} from "../types/SkattekortResponseDTOSchema";
import { toLocalDate, toLocalTime } from "../util/norskFormat";
import LabelText from "./LabelText";

function menneskeleseligTilleggsopplysning(t: string) {
	if (t === "oppholdPaaSvalbard") return "Opphold på Svalbard";
	else if (t === "kildeskattPaaPensjon") return "Kildeskatt på pensjon";
	else if (t === "oppholdITiltakssone") return "Opphold i tiltakssone";
	else return t;
}

function isNotEmpty<T>(list?: T[] | null | undefined): list is T[] {
	return !!list && list.length > 0;
}

function isEmpty<T>(list?: T[] | null | undefined): boolean {
	return !list || list.length === 0;
}

export default function Skattekortdata({
	skattekort,
}: Readonly<{ skattekort: Skattekort }>) {
	return (
		<VStack gap="space-32" margin="space-16">
			<VStack gap="space-8">
				<HStack justify="space-between" wrap={false}>
					<VStack gap="space-8">
						{skattekort.identifikator && (
							<LabelText
								label="Identifikator"
								text={skattekort.identifikator}
							/>
						)}
					</VStack>
					<Label>{`Mottatt: ${toLocalDate(skattekort.opprettet)} - ${toLocalTime(skattekort.opprettet)}`}</Label>
				</HStack>
				{isNotEmpty(skattekort.tilleggsopplysningList) && (
					<LabelText
						label="Tilleggsopplysning"
						text={skattekort.tilleggsopplysningList
							?.map((t) => menneskeleseligTilleggsopplysning(t))
							.join(", ")}
					/>
				)}
			</VStack>

			{skattekort.resultatForSkattekort === "ikkeSkattekort" &&
				isEmpty(skattekort.forskuddstrekkList) && (
					<BodyShort>Har ikke skattekort</BodyShort>
				)}

			{isNotEmpty(skattekort.forskuddstrekkList) && (
				<Table>
					<Table.Body>
						{skattekort.forskuddstrekkList.map((ft) => {
							let trekkprosent = null;
							let frikort = null;
							let tabell = null;
							let antallMndForTrekk = null;

							if (ft.prosentkort) {
								trekkprosent = (
									<BodyShort>{`Trekkprosent ${ft.prosentkort.prosentSats}%`}</BodyShort>
								);
								if (ft.prosentkort.antallMndForTrekk)
									antallMndForTrekk = (
										<BodyShort>{`Antall mnd. for trekk ${ft.prosentkort.antallMndForTrekk}`}</BodyShort>
									);
							}

							if (ft.trekktabell) {
								trekkprosent = (
									<BodyShort>{`Trekkprosent ${ft.trekktabell.prosentSats}%`}</BodyShort>
								);
								tabell = (
									<BodyShort>{`Tabell ${ft.trekktabell.tabell}`}</BodyShort>
								);
								antallMndForTrekk = (
									<BodyShort>{`Antall mnd. for trekk ${ft.trekktabell.antallMndForTrekk}`}</BodyShort>
								);
							}

							if (ft.frikort) {
								frikort = (
									<BodyShort>
										{ft.frikort.frikortBeloep == null
											? "Frikort uten beløpsgrense"
											: `Frikortbeløp ${ft.frikort.frikortBeloep}`}
									</BodyShort>
								);
							}

							return (
								<Table.Row key={ft.trekkode}>
									<Table.HeaderCell>{Trekkode[ft.trekkode]}:</Table.HeaderCell>
									<Table.DataCell>{trekkprosent}</Table.DataCell>
									<Table.DataCell>{frikort || tabell}</Table.DataCell>
									<Table.DataCell>{antallMndForTrekk}</Table.DataCell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table>
			)}
			<BodyShort size="small">{`Kilde: ${menneskeleseligKilde(skattekort.kilde)}`}</BodyShort>
		</VStack>
	);
}
