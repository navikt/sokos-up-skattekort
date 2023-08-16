import React, { useEffect, useState } from "react";
import SkattekortSearch from "../components/SkattekortSearch";
import Skattekortvisning from "../components/Skattekortvisning";
import useSWRImmutable from "swr/immutable";
import { skattekortDataUrl } from "../urls";
import { fetcher } from "../util/apiClient";
import SkattekortData, { SkattekortListeSchema } from "../models/SkattekortData";
import { Alert, Heading, Loader } from "@navikt/ds-react";
import styles from "./Skattekort.module.css";
import { isEmpty } from "../util/commonUtils";

type SkattekortPersonRequestBody = {
  fnr: string;
  inntektsaar: number;
};

const SkattekortPage = () => {
  const [searchBody, setSearchBody] = useState<SkattekortPersonRequestBody>();
  const [skattekortData, setSkattekortData] = useState<SkattekortData>();
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

  const { data, isLoading, error } = useSWRImmutable<SkattekortData>(query, fetcher);

  useEffect(() => {
    if (data) {
      const safeParse = SkattekortListeSchema.safeParse(data);

      if (!safeParse.success) {
        console.error("Ugyldig skattekortdataresultat" + safeParse.error.message);
      } else {
        setSkattekortData(safeParse.data);
      }
    } else setSkattekortData(undefined);
  }, [data]);

  const handleSubmit = (fnr: string, year: number) => {
    const searchParameters = { fnr, inntektsaar: year };
    if (fnr && year) setSearchBody(() => searchParameters);
    else setSearchBody(undefined);
  };

  const showSkatteKort = () => {
    if (isLoading) {
      return (
        <div className={styles.skattekort__loader}>
          <Loader size="3xlarge" title="Henter Skattekort" />
        </div>
      );
    }

    if (error) {
      return <Alert variant="error">En feil oppstod, prøv igjen</Alert>;
    }

    if (!skattekortData) {
      return <></>;
    }

    if (isEmpty(skattekortData.skattekortListe)) {
      return (
        <Alert variant="warning">
          {`Ingen skattekort funnet for år ${searchBody?.inntektsaar} med bruker ${searchBody?.fnr}`}
        </Alert>
      );
    }

    return <Skattekortvisning data={skattekortData} />;
  };

  return (
    <div className={styles.skattekort}>
      <Heading level="1" size="medium">
        Skattekort
      </Heading>
      <SkattekortSearch handleSubmit={handleSubmit} />
      {showSkatteKort()}
    </div>
  );
};
export default SkattekortPage;
