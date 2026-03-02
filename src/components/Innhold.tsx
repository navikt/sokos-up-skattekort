import { HStack, Table, VStack } from "@navikt/ds-react";
import { type Skattekort, Trekkode } from "../types/schema/SkattekortSchema";
import LabelText from "./LabelText";

export default function Innhold({
	skattekort,
}: Readonly<{ skattekort: Skattekort }>) {
	return (
		<>
			<HStack justify="space-between">
				<VStack gap="space-8">
					<LabelText label="Identifikator" text={skattekort.identifikator} />
					{skattekort?.tilleggsopplysningList &&
						skattekort.tilleggsopplysningList.length > 0 && (
							<LabelText
								label="Tilleggsopplysning"
								text={skattekort.tilleggsopplysningList?.join(", ")}
							/>
						)}
				</VStack>
				<VStack gap="space-8">
					<LabelText label="Utstedt dato" text={skattekort.utstedtDato} />
					<LabelText label="Mottatt" text={skattekort.mottatt} />
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
