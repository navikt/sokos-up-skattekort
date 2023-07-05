import React, { useState } from "react";
import SkattekortSearch from "../components/SkattekortSearch";
import Skattekortvisning from "../components/Skattekortvisning";
import useSWRImmutable from "swr/immutable";
import { skattekortDataUrl } from "../api/urls";
import { fetcher } from "../api/api";
import SkattekortData from "../models/SkattekortData";
import { Alert, Heading, Loader } from "@navikt/ds-react";
import styles from "./Skattekort.module.css";

type SkattekortPersonRequestBody = {
  fnr: string;
  inntektsaar: number;
};

const SkattekortPage = () => {
  const [searchBody, setSearchBody] = useState<SkattekortPersonRequestBody>();

  const query = searchBody
    ? {
        path: skattekortDataUrl,
        options: {
          method: "POST",
          body: JSON.stringify(searchBody),
          headers: { "Content-Type": "application/json;charset=UTF-8" },
        },
      }
    : null;

  const { data, isLoading, error: fetchError } = useSWRImmutable<SkattekortData>(query, fetcher);

  const handleSubmit = (fnr: string, year: number) => {
    const searchParameters = { fnr, inntektsaar: year };
    if (fnr && year) setSearchBody(() => searchParameters);
    else setSearchBody(undefined);
  };

  const showSkattekort = data && !isLoading && !fetchError && !!data.skattekortListe?.length;
  const emptySkattekort = data && !isLoading && !fetchError && !data.skattekortListe?.length;

  return (
    <div className={styles.skattekort}>
      <Heading level="1" size="medium">
        Skattekort
      </Heading>
      <SkattekortSearch handleSubmit={handleSubmit} />
      {showSkattekort && <Skattekortvisning data={data} />}
      {isLoading && (
        <div className={styles.skattekort__loader}>
          <Loader size="3xlarge" title="Henter Skattekort" />
        </div>
      )}
      {emptySkattekort && (
        <Alert variant="warning">
          {`Ingen skattekort funnet for år ${searchBody?.inntektsaar} med bruker ${searchBody?.fnr}`}
        </Alert>
      )}
      {fetchError && <Alert variant="error">En feil oppstod, prøv igjen</Alert>}
    </div>
  );
};

export default SkattekortPage;
