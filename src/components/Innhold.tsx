import { Table } from "@navikt/ds-react";
import { type Skattekort, Trekkode } from "../types/schema/SkattekortSchema";
import styles from "./Innhold.module.css";
import LabelText from "./LabelText";

export default function Innhold({
	skattekort,
}: Readonly<{ skattekort: Skattekort }>) {
	return (
		<>
			<div className={styles["skattekort-container"]}>
				<div className={styles["skattekort-details"]}>
					<LabelText label="Identifikator" text={skattekort.identifikator} />
					{skattekort.tilleggsopplysningList && (
						<LabelText
							label="Tilleggsopplysning"
							text={skattekort.tilleggsopplysningList?.join(", ")}
						/>
					)}
				</div>
				<div className={styles["skattekort-details-right"]}>
					<LabelText label="Utstedt dato" text={skattekort.utstedtDato} />
					<LabelText label="Mottatt" text={skattekort.mottatt} />
				</div>
			</div>
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
									trekkprosent = `Trekkprosent ${ft.prosentkort.prosentSats}%`;
									if (ft.prosentkort.antallMndForTrekk)
										antallMndForTrekk = `Antall måneder for trekk: ${ft.prosentkort.antallMndForTrekk}`;
								}

								if (ft.trekktabell) {
									tabell = `Tabell: ${ft.trekktabell.tabell ?? "-"}`;
									trekkprosent = `Trekkprosent: ${ft.trekktabell.prosentSats}%`;
									antallMndForTrekk = `Antall måneder for trekk: ${ft.trekktabell.antallMndForTrekk}`;
								}

								if (ft.frikort) {
									frikort = `Frikortbeløp: ${ft.frikort.frikortBeloep ?? "∞"}`;
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
