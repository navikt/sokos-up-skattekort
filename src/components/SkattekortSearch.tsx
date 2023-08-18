import { Chips, Search } from "@navikt/ds-react";
import styles from "./SkattekortSearch.module.css";
import { SkattekortSearchOptions } from "../pages/skattekort";

type SkattekortSearchProps = {
  searchOptions: SkattekortSearchOptions;
  submitHandler: () => void;
};

const SkattekortSearch = ({ searchOptions, submitHandler }: SkattekortSearchProps) => {
  return (
    <>
      <Search
        label="Betalingsmottaker"
        description="Tast inn fødselsnummer 11 siffer"
        hideLabel={false}
        htmlSize="12"
        error={searchOptions.error}
        onChange={searchOptions.fnrOnChange}
        onSearchClick={submitHandler}
        value={searchOptions.fnr}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitHandler();
          }
        }}
      />
      <Chips className={styles.chips}>
        {searchOptions.yearOptions.map((selectedYear) => (
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
