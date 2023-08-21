import { Chips, Search } from "@navikt/ds-react";
import styles from "./SkattekortSearch.module.css";
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
}: SkattekortSearchProps) => {
  return (
    <>
      <Search
        label="Betalingsmottaker"
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
      <Chips className={styles.chips}>
        {searchOptions.yearList.map((selectedYear) => (
          <Chips.Toggle
            selected={searchOptions.year === selectedYear}
            key={selectedYear}
            onClick={() => searchOptions.setYear(selectedYear)}
          >
            {selectedYear.toString()}
          </Chips.Toggle>
        ))}
      </Chips>
    </>
  );
};
export default SkattekortSearch;
