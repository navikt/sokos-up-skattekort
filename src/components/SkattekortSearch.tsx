import { Heading, HelpText, Search, ToggleGroup } from "@navikt/ds-react";
import styles from "./SkattekortSearch.module.css";
import commonStyles from "../util/commonStyles.module.css";
import { SkattekortSearchOptions } from "../pages/skattekort";

type SkattekortSearchProps = {
  searchOptions: SkattekortSearchOptions;
  inputError?: string;
  clearInputErrorOnChange: () => void;
  submitHandler: (fnr: string, year: number) => void;
};

const SkattekortSearch = ({
  searchOptions,
  submitHandler,
  inputError,
  clearInputErrorOnChange,
}: SkattekortSearchProps) => {
  const changeYearHandler = (yearstr: string) => {
    const year = parseInt(yearstr);
    searchOptions.setYear(year);
    if (!inputError && searchOptions.fnr) {
      submitHandler(searchOptions.fnr, year);
    }
  };

  return (
    <div className={styles.skattekortsearch}>
      <Heading level="2" size="medium">
        Søk
      </Heading>
      <Search
        label="Gjelder ID"
        defaultValue="Tast inn fødselsnummer 11 siffer"
        autoFocus
        hideLabel={false}
        htmlSize="24"
        error={inputError}
        onChange={(fnr) => {
          searchOptions.fnrInputOnChange(fnr);
          clearInputErrorOnChange();
        }}
        onSearchClick={() => submitHandler(searchOptions.fnr, searchOptions.year)}
        value={searchOptions.fnr}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitHandler(searchOptions.fnr, searchOptions.year);
          }
        }}
      />
      <div className={styles.skattekortsearch__help}>
        <HelpText title="Informasjon om Skattekort" placement="left-start" strategy="fixed">
          <strong>Informasjon om Skattekort:</strong>
          <br />
          Skattekort viser skattekortet slik det er mottatt fra Skatteetaten. For å se hvilken del av skattekortet som
          vil bli, eller er, brukt i en beregning må menypunktet "Skatt og trekk" og undermenypunkt "eSkattekort - Søk"
          i Økonomiportal benyttes.
        </HelpText>
      </div>
      <div className={commonStyles.column}>
        <div className={commonStyles.bold}>Gjelder år</div>
        <ToggleGroup defaultValue={"" + searchOptions.year} onChange={changeYearHandler}>
          {searchOptions.yearList.map((selectedYear) => (
            <ToggleGroup.Item key={selectedYear} value={"" + selectedYear}>
              <div className={styles.skattekortsearch__toggleitems}>{selectedYear}</div>
            </ToggleGroup.Item>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
};
export default SkattekortSearch;
