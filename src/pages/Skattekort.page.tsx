import React from "react";
import SkattekortSearch from "../components/SkattekortSearch";
import Skattekortvisning from "../components/Skattekortvisning";
import { Alert, Heading, Loader } from "@navikt/ds-react";
import styles from "./Skattekort.module.css";
import { isEmpty } from "../util/commonUtils";
import { useSkattekortFetch, useSkattekortSearch } from "./skattekort";

const SkattekortPage = () => {
  const searchOptions = useSkattekortSearch("", 0);
  const fetchData = useSkattekortFetch(searchOptions.fnr, searchOptions.year);
  const { isLoading, error, data, submitHandler } = fetchData;

  const showSkatteKort = () => {
    if (isLoading) {
      return (
        <div className={styles.skattekort__loader}>
          <Loader size="3xlarge" title="Henter Skattekort" />
        </div>
      );
    } else if (error) {
      return <Alert variant="error">En feil oppstod, prøv igjen</Alert>;
    } else if (!data) {
      return <></>;
    } else if (data && isEmpty(data.skattekortListe)) {
      return <Alert variant="warning">{`Ingen skattekort funnet`}</Alert>;
    } else if (data) {
      return <Skattekortvisning data={data} />;
    }
  };

  return (
    <div className={styles.skattekort}>
      <Heading level="1" size="medium">
        Skattekort
      </Heading>
      <SkattekortSearch searchOptions={searchOptions} submitHandler={submitHandler} />
      {showSkatteKort()}
    </div>
  );
};
export default SkattekortPage;
