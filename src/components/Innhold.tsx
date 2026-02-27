import { Table } from "@navikt/ds-react";
import type React from "react";
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
					<LabelText label="Indentifikator" text={skattekort.identifikator} />
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
							{skattekort.forskuddstrekkList.map((ft, ftIndex) => {
								let col2 = "";
								let col3 = "";
								let col4 = "";

								if (ft.prosentkort) {
									col2 = `Trekkprosent ${ft.prosentkort.prosentSats}%`;
									col4 = `Antall måneder for trekk: ${ft.prosentkort.antallMndForTrekk}`;
								}

								if (ft.trekktabell) {
									col3 = `Tabell: ${ft.trekktabell.tabell ?? "-"}`;
									col2 = `Trekkprosent: ${ft.trekktabell.prosentSats}%`;
									col4 = `Antall måneder for trekk: ${ft.trekktabell.antallMndForTrekk}`;
								}

								if (ft.frikort) {
									col3 = `Frikortbeløp: ${ft.frikort.frikortBeloep ?? "∞"}`;
								}

								return (
									<Table.Row key={ft.trekkode}>
										<Table.HeaderCell>{Trekkode[ft.trekkode]}</Table.HeaderCell>
										<Table.DataCell>{col2}</Table.DataCell>
										<Table.DataCell>{col3}</Table.DataCell>
										<Table.DataCell>{col4}</Table.DataCell>
									</Table.Row>
								);
							})}
						</Table.Body>
					</Table>
				)}
		</>
	);
}
