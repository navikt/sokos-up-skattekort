import { Heading, Search, ToggleGroup } from "@navikt/ds-react";
import styles from "./SkattekortSearch.module.css";
import commonStyles from "../util/commonStyles.module.css";
import { SkattekortSearchOptions } from "../pages/skattekort";
import SearchHelp from "./SearchHelp";

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
    <div className={commonStyles.hvit_boks}>
      <Heading level="2" size="medium">
        Søk
      </Heading>
      <div className={styles.skattekortsearch}>
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
          <SearchHelp />
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
    </div>
  );
};
export default SkattekortSearch;
