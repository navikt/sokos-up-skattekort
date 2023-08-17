import { Chips, Search } from "@navikt/ds-react";
import styles from "./SkattekortSearch.module.css";
import { SkattekortInutResult, useSkattekortInput } from "../pages/skattekort";
import { ChangeEvent } from "react";

type SkattekortSearchProps = {
  searchInput: SkattekortInutResult;
  yearOptions: number[];
};

const SkattekortSearch = ({ yearOptions, searchInput }: SkattekortSearchProps) => {
  const { fnr, year, setFnr, setYear, error, validateFodselsnummer, fnrInputHandler } = useSkattekortInput(fnr, year);

  return (
    <>
      <Search
        label="Betalingsmottaker"
        description="Tast inn fødselsnummer 11 siffer"
        hideLabel={false}
        htmlSize="12"
        error={error}
        onChange={fnrInputHandler}
        onSearchClick={validateFodselsnummer}
        value={fnr}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            validateFodselsnummer();
          }
        }}
      />
      <Chips className={styles.chips}>
        {yearOptions.map((selectedYear) => (
          <Chips.Toggle
            selected={year === selectedYear}
            key={selectedYear}
            onClick={() => setYear(searchInput.setYear(selectedYear))}
          >
            {selectedYear.toString()}
          </Chips.Toggle>
        ))}
      </Chips>
    </>
  );
};
export default SkattekortSearch;
