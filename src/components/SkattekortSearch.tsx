import { Chips, Search } from "@navikt/ds-react";
import { ChangeEvent, useState } from "react";
import { isValidFodselsnummer } from "../util/fnrValidator";
import styles from "./SkattekortSearch.module.css";

type SkattekortSearchProps = {
  handleSubmit: (fnr: string, year: number) => void;
};

const SkattekortSearch = ({ handleSubmit }: SkattekortSearchProps) => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [error, setError] = useState("");
  const submitHandler = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const rawFodselsnummer: string = event.target.search.value;
    const fodselsnummer = rawFodselsnummer.replace(/[\s.]/g, "");

    if (isValidFodselsnummer(fodselsnummer)) {
      handleSubmit(fodselsnummer, year);
    } else {
      handleSubmit("", year);
      setError("Oppgitt personnummer er ikke gyldig");
    }
  };

  return (
    <form role={"search"} onSubmit={submitHandler}>
      <Search
        label="Betalingsmottaker"
        description="Tast inn fødselsnummer 11 siffer"
        hideLabel={false}
        htmlSize="12"
        name={"search"}
        error={error}
        onChange={() => setError("")}
      />
      <Chips className={styles.chips}>
        {[year - 1, year, year + 1].map((c) => (
          <Chips.Toggle selected={year === c} key={c} onClick={() => setYear(c)} type={"submit"}>
            {c.toString()}
          </Chips.Toggle>
        ))}
      </Chips>
    </form>
  );
};
export default SkattekortSearch;
