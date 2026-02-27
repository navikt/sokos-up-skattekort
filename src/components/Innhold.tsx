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
							{skattekort.forskuddstrekkList.map((ft, ftIndex) => {
								let trekkprosentkolonne = "";
								let frikortEllerTabellkolonne = "";
								let antallMndForTrekkkolonne = "";

								if (ft.prosentkort) {
									trekkprosentkolonne = `Trekkprosent ${ft.prosentkort.prosentSats}%`;
									if (ft.prosentkort.antallMndForTrekk)
										antallMndForTrekkkolonne = `Antall måneder for trekk: ${ft.prosentkort.antallMndForTrekk}`;
								}

								if (ft.trekktabell) {
									frikortEllerTabellkolonne = `Tabell: ${ft.trekktabell.tabell ?? "-"}`;
									trekkprosentkolonne = `Trekkprosent: ${ft.trekktabell.prosentSats}%`;
									antallMndForTrekkkolonne = `Antall måneder for trekk: ${ft.trekktabell.antallMndForTrekk}`;
								}

								if (ft.frikort) {
									frikortEllerTabellkolonne = `Frikortbeløp: ${ft.frikort.frikortBeloep ?? "∞"}`;
								}

								return (
									<Table.Row key={ft.trekkode}>
										<Table.HeaderCell>{Trekkode[ft.trekkode]}</Table.HeaderCell>
										<Table.DataCell>{trekkprosentkolonne}</Table.DataCell>
										<Table.DataCell>{frikortEllerTabellkolonne}</Table.DataCell>
										<Table.DataCell>{antallMndForTrekkkolonne}</Table.DataCell>
									</Table.Row>
								);
							})}
						</Table.Body>
					</Table>
				)}
		</>
	);
}
