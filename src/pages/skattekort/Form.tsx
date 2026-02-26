import { EraserIcon, MagnifyingGlassIcon } from "@navikt/aksel-icons";
import {
	Alert,
	Button,
	Heading,
	HelpText,
	TextField,
} from "@navikt/ds-react";
import { useState } from "react";
import styles from "./Form.module.css";
import {useFetchSkattekort} from "../../api/apiService";

export default function Form() {
	const [fnr, setFnr] = useState("");
	const [loading, setLoading] = useState(false);
	const [fnrError, setFnrError] = useState<string | null>(null);
    const {data, error } = useFetchSkattekort(fnr);
    
    const forksuddstrekktype = (ft: any) => {
        if (ft.prosentkort) {
            return "Prosentkort";
        } else if (ft.trekktabell) {
            return "Tabellkort";
        } else {
            return "Frikort";
        } 
    }
    
	const validateFnr = (value: string): string | null => {
		if (!value) {
			return "Fødselsnummer er påkrevd";
		}
		if (value.length !== 11) {
			return "Fødselsnummer må være 11 siffer";
		}
		if (!/^\d{11}$/.test(value)) {
			return "Fødselsnummer må inneholde kun tall";
		}
		return null;
	};

	const handleFnrChange = (value: string) => {
		setFnr(value);
		setFnrError(null);
	};

	const handleReset = () => {
		setFnr("");
		setFnrError(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
        
		const validationError = validateFnr(fnr);
		if (validationError) {
			setFnrError(validationError);
			return;
		}

		setLoading(true);
    };

	return (
		<div className={styles.container}>
			<Heading level="1" size="large" spacing>
				Skattekort
			</Heading>
			<div className={styles.box}>
				<div className={styles.helptext}>
					<HelpText title="Hjelp">
						Søk etter skattekort ved å oppgi fødselsnummer og velge år.
					</HelpText>
				</div>

				<form onSubmit={handleSubmit} className={styles.form}>
					<div className={styles.formLeft}>
						<TextField
							label="Gjelder"
							size="small"
							value={fnr}
							onChange={(e) => handleFnrChange(e.target.value)}
							error={fnrError}
							autoComplete="off"
							maxLength={11}
							className={styles.input}
						/>
                    </div>

					<div className={styles.formRight}>
						<Button
							type="button"
							size="small"
							icon={<EraserIcon />}
							iconPosition="right"
							variant="secondary"
							onClick={handleReset}
						>
							Nullstill
						</Button>
						<Button
							type="submit"
							size="small"
							icon={<MagnifyingGlassIcon />}
							iconPosition="right"
							loading={loading}
						>
							Søk
						</Button>
					</div>
				</form>
			</div>

			{error && (
				<Alert variant="error" className={styles.alert}>
					{error}
				</Alert>
			)}

			{/*{data && data.length === 0 && (*/}
			{/*	<Alert variant="info" className={styles.alert}>*/}
			{/*		Ingen skattekort funnet for det valgte året.*/}
			{/*	</Alert>*/}
			{/*)}*/}

			{data?.map(((skattekort,index) => (
				<div key={index} className={styles.result}>
					<Heading level="3" size="small" spacing>
						Skattekort for  {skattekort.inntektsaar}
					</Heading>

                    
					<div className={styles.arbeidstaker}>
						<dl className={styles.details}>
							<dt>Inntektsår:</dt>
							<dd>{skattekort.inntektsaar}</dd>
                    
							<dt>Resultat:</dt>
							<dd>{skattekort.resultatForSkattekort}</dd>
                    
							{skattekort && (
								<>
									{skattekort.utstedtDato && (
										<>
											<dt>Utstedt dato:</dt>
											<dd>{skattekort.utstedtDato}</dd>
										</>
									)}
                    
									{/*{skattekort.skattekortidentifikator && (*/}
									{/*	<>*/}
									{/*		<dt>Skattekort ID:</dt>*/}
									{/*		<dd>{at.skattekort.skattekortidentifikator}</dd>*/}
									{/*	</>*/}
									{/*)}*/}
                    
									{skattekort.forskuddstrekkList &&
										skattekort.forskuddstrekkList.length > 0 && (
											<>
												<dt>Forskuddstrekk:</dt>
												<dd>
													<ul className={styles.forskuddstrekkList}>
														{skattekort.forskuddstrekkList.map((ft, ftIndex) => (
															<li key={`${ft.trekkode}-${ftIndex}`}>
																<strong>{forksuddstrekktype(ft)}</strong> ({ft.trekkode})
																{ft.prosentkort && <span> - {ft.prosentkort.prosentSats}%</span>}
																{ft.trekktabell && <span> - Tabell {ft.trekktabell.tabell}</span>}
																{ft.frikort && <span>- Frikortbeløp: {ft.frikort.frikortBeloep}</span>}
															</li>
														))}
													</ul>
												</dd>
											</>
										)}
								</>
							)}
                    
							{skattekort.tilleggsopplysningList && skattekort.tilleggsopplysningList.length > 0 && (
								<>
									<dt>Tilleggsopplysninger:</dt>
									<dd>{skattekort.tilleggsopplysningList.join(", ")}</dd>
								</>
							)}
						</dl>
					</div>
				</div>
			)))}
		</div>
	);
}
