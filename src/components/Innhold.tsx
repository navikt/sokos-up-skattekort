import { HStack, Table, VStack } from "@navikt/ds-react";
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
		<>
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
					<LabelText label="Kilde" text={skattekort.kilde} />
				</VStack>
				<VStack gap="space-8">
					{skattekort.utstedtDato && (
						<LabelText
							label="Utstedt dato"
							text={toLocalDate(skattekort.utstedtDato)}
						/>
					)}
					<LabelText label="Mottatt" text={toLocalDate(skattekort.opprettet)} />
					<LabelText
						label="Mottatt tidspunkt"
						text={toLocalTime(skattekort.opprettet)}
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
										<LabelText
											label="Trekkprosent"
											text={`${ft.prosentkort.prosentSats}%`}
										/>
									);
									if (ft.prosentkort.antallMndForTrekk)
										antallMndForTrekk = (
											<LabelText
												label="Antall måneder for trekk"
												text={ft.prosentkort.antallMndForTrekk}
											/>
										);
								}

								if (ft.trekktabell) {
									tabell = (
										<LabelText label="Tabell" text={ft.trekktabell.tabell} />
									);
									trekkprosent = (
										<LabelText
											label="Trekkprosent"
											text={`${ft.trekktabell.prosentSats}%`}
										/>
									);
									antallMndForTrekk = (
										<LabelText
											label="Antall måneder for trekk"
											text={ft.trekktabell.antallMndForTrekk}
										/>
									);
								}

								if (ft.frikort) {
									frikort = (
										<LabelText
											label="Frikortbeløp"
											text={ft.frikort.frikortBeloep ?? "∞"}
										/>
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
		</>
	);
}
