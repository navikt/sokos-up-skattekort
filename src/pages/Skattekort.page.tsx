import { useState } from "react";
import SkattekortSearch from "../components/SkattekortSearch";
import Skattekortvisning from "../components/Skattekortvisning";
import useSWRImmutable from "swr/immutable";
import { skattekortDataUrl } from "../api/urls";
import { fetcher } from "../api/api";
import SkattekortData from "../models/Skattekortdata";
import { Loader } from "@navikt/ds-react";
import styles from "./Skattekort.page.module.css";

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

  return (
    <>
      <SkattekortSearch handleSubmit={handleSubmit} />
      {showSkattekort && <Skattekortvisning data={data} />}
      {isLoading && (
        <div className={styles.loader}>
          <Loader size="3xlarge" title="Henter Skattekort" />
        </div>
      )}
    </>
  );
};

export default SkattekortPage;
