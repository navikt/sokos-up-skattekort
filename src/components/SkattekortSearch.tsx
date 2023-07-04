import { Chips, Search } from "@navikt/ds-react";
import styles from "./SkattekortSearch.module.css";
import { ChangeEvent, useState } from "react";
import { isValidBirthNumber } from "../util/fnrValidationUtil";

type SkattekortSearchProps = {
  handleSubmit: (fnr: string, year: number) => void;
};

const SkattekortSearch = ({ handleSubmit }: SkattekortSearchProps) => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [error, setError] = useState("");
  const submitHandler = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fnr: string = event.target.search.value;

    if (fnr.replace(/[\s.]/g, "").match(/^[0-9]{11}$/)) {
      if (isValidBirthNumber(fnr)) {
        setError("");
        handleSubmit(fnr, year);
        setError("");
      } else {
        handleSubmit("", year);
        setError("Personnummer er ikke gyldig");
      }
    } else {
      handleSubmit("", year);
      setError("Personnummer må være 11 siffer");
    }
  };

  return (
    <form role={"search"} onSubmit={submitHandler}>
      <div className={styles.searchForm}>
        <Search
          label="Betalingsmottaker"
          description="Tast inn fødselsnummer 11 siffer"
          hideLabel={false}
          htmlSize="12"
          name={"search"}
          error={error}
          onChange={() => setError("")}
        />
        <Chips>
          {[currentYear - 1, currentYear, currentYear + 1].map((c) => (
            <Chips.Toggle selected={year === c} key={c} onClick={() => setYear(c)} type={"submit"}>
              {c.toString()}
            </Chips.Toggle>
          ))}
        </Chips>
      </div>
    </form>
  );
};
export default SkattekortSearch;
