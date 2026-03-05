import { BodyShort, HStack, Table, VStack } from "@navikt/ds-react";
import { type Skattekort, Trekkode } from "../types/schema/SkattekortSchema";
import LabelText from "./LabelText";

function toLocalDate(zulu: string) {
	return Intl.DateTimeFormat("no-NO", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(new Date(zulu));
}

function toLocalTime(zulu: string) {
	return Intl.DateTimeFormat("no-NO", {
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23",
	}).format(new Date(zulu));
}

export default function Innhold({
	skattekort,
}: Readonly<{ skattekort: Skattekort }>) {
	return (
		<VStack gap="space-32">
			<HStack justify="space-between">
				<VStack gap="space-8">
					{skattekort.identifikator && (
						<LabelText label="Identifikator" text={skattekort.identifikator} />
					)}
					{skattekort?.tilleggsopplysningList &&
						skattekort.tilleggsopplysningList.length > 0 && (
							<LabelText
								label="Tilleggsopplysning"
								text={skattekort.tilleggsopplysningList?.join(", ")}
							/>
						)}
				</VStack>
				<VStack gap="space-8">
					{skattekort.utstedtDato && (
						<LabelText
							label="Utstedt dato"
							text={toLocalDate(skattekort.utstedtDato)}
						/>
					)}
					<LabelText
						label="Mottatt"
						text={`${toLocalDate(skattekort.opprettet)} - ${toLocalTime(skattekort.opprettet)}`}
					/>
				</VStack>
			</HStack>
			{skattekort?.forskuddstrekkList &&
				skattekort.forskuddstrekkList.length > 0 && (
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
											<BodyShort>{`Antall måneder for trekk ${ft.prosentkort.antallMndForTrekk}`}</BodyShort>
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
										<BodyShort>{`Antall måneder for trekk ${ft.trekktabell.antallMndForTrekk}`}</BodyShort>
									);
								}

								if (ft.frikort) {
									frikort = (
										<BodyShort>{`Frikortbeløp ${ft.frikort.frikortBeloep ?? "∞"}`}</BodyShort>
									);
								}

								return (
									<Table.Row key={ft.trekkode}>
										<Table.HeaderCell>{Trekkode[ft.trekkode]}</Table.HeaderCell>
										<Table.DataCell>{trekkprosent}</Table.DataCell>
										<Table.DataCell>{frikort || tabell}</Table.DataCell>
										<Table.DataCell>{antallMndForTrekk}</Table.DataCell>
									</Table.Row>
								);
							})}
						</Table.Body>
					</Table>
				)}
			<BodyShort size="small">{`Kilde: ${skattekort.kilde}`}</BodyShort>
		</VStack>
	);
}
