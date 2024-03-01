import React from "react";
import SkattekortSearch from "../components/SkattekortSearch";
import Skattekortvisning from "../components/Skattekortvisning";
import { Alert, Heading, Loader } from "@navikt/ds-react";
import styles from "./Skattekort.module.css";
import commonStyles from "../util/commonStyles.module.css";
import { isEmpty } from "../util/commonUtils";
import { useSkattekortFetch, useSkattekortSearch } from "./skattekort";

const SkattekortPage = () => {
  const searchOptions = useSkattekortSearch("");
  const { isLoading, error, data, submitHandler, inputError, clearInputErrorOnChange } = useSkattekortFetch();

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
    } else if (isEmpty(data)) {
      return (
        <Alert variant="warning">
          <div className={commonStyles.bold}>{`Ingen skattekort funnet`}</div>
        </Alert>
      );
    } else if (isEmpty(data[0].arbeidsgiver))
      return (
        <>
          <hr className={commonStyles.separator} />
          <div className={styles.skattekort__name}>{data[0]?.navn ?? "N.N."}</div>

          <Alert variant="warning">
            <div className={commonStyles.bold}>{`Ingen skattekort funnet`}</div>
            <div>Vi fant ingen opplysninger om skattekort på dette fødselsnummeret</div>
          </Alert>
        </>
      );
    else if (data && data[0])
      return (
        <>
          <hr className={commonStyles.separator} />
          <div className={styles.skattekort__name}>{data[0].navn ?? "N.N."}</div>
          <Skattekortvisning data={data} />
        </>
      );
  };

  return (
    <div className={styles.skattekort}>
      <Heading level="1" size="medium">
        Skattekort
      </Heading>
      <SkattekortSearch
        inputError={inputError}
        clearInputErrorOnChange={clearInputErrorOnChange}
        searchOptions={searchOptions}
        submitHandler={submitHandler}
      />
      {showSkatteKort()}
    </div>
  );
};
export default SkattekortPage;
