import { Heading, VStack } from "@navikt/ds-react";
import { useState } from "react";
import { useFetchNavn, useFetchSkattekort } from "../api/apiService";
import Errorhandler from "../components/Errorhandler";
import ShowName from "../components/ShowName";
import ShowSkattekort from "../components/ShowSkattekort";
import Soek from "../components/Soek";
import styles from "./Hovedside.module.css";

export default function Hovedside() {
	const [isSubmit, setIsSubmit] = useState<boolean>(false);
	const [fnr, setFnr] = useState<string>("");

	const { data, error, isLoading } = useFetchSkattekort(fnr);
	const {
		data: navn,
		error: navnError,
		isLoading: navnIsLoading,
	} = useFetchNavn(fnr);

	return (
		<div className={styles.page}>
			<VStack gap="space-16">
				<Heading spacing level="1" size="large" align={"center"}>
					Skattekort
				</Heading>
				<VStack gap="space-24">
					<Soek
						setFnr={setFnr}
						setIsSubmit={setIsSubmit}
						isLoading={navnIsLoading}
					/>

					{isSubmit && !isLoading && (
						<Errorhandler error={error} navnError={navnError} />
					)}

					<ShowName fnr={fnr} navn={navn} navnIsLoading={navnIsLoading} />

					<ShowSkattekort data={data} isLoading={isLoading} />
				</VStack>
			</VStack>
		</div>
	);
}
