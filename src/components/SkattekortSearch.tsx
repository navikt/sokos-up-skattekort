import { Search, ToggleGroup } from "@navikt/ds-react";
import styles from "./SkattekortSearch.module.css";
import commonStyles from "../util/commonStyles.module.css";
import { SkattekortSearchOptions } from "../pages/skattekort";

type SkattekortSearchProps = {
  searchOptions: SkattekortSearchOptions;
  inputError?: string;
  clearInputErrorOnChange: () => void;
  submitHandler: () => void;
};

const SkattekortSearch = ({
  searchOptions,
  submitHandler,
  inputError,
  clearInputErrorOnChange,
}: SkattekortSearchProps) => (
  <>
    <Search
      label="Søk på person"
      description="Tast inn fødselsnummer 11 siffer"
      hideLabel={false}
      htmlSize="12"
      error={inputError}
      onChange={(fnr) => {
        searchOptions.fnrInputOnChange(fnr);
        clearInputErrorOnChange();
      }}
      onSearchClick={submitHandler}
      value={searchOptions.fnr}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          submitHandler();
        }
      }}
    />
    <div className={commonStyles.column}>
      <div className={commonStyles.bold}>Gjelder år</div>
      <ToggleGroup defaultValue={"" + searchOptions.year} onChange={(year) => searchOptions.setYear(parseInt(year))}>
        {searchOptions.yearList.map((selectedYear) => (
          <ToggleGroup.Item key={selectedYear} value={"" + selectedYear}>
            <div className={styles.skattekortsearch__toggleitems}>{selectedYear}</div>
          </ToggleGroup.Item>
        ))}
      </ToggleGroup>
    </div>
  </>
);
export default SkattekortSearch;
