import { Radio, RadioGroup, Search } from "@navikt/ds-react";
import styles from "../pages/skattekort.module.css";

type SkattekortSearchProps = {
  handleSubmit: (fnr: string, year: number) => void;
};

const SkattekortSearch = ({ handleSubmit }: SkattekortSearchProps) => {
  const year = new Date().getFullYear();
  const submitHandler = (event: { preventDefault: () => void; target: any }) => {
    event.preventDefault();

    const fnr: string = event.target.search.value;
    const year = event.target.year.value;

    handleSubmit(fnr, year);
  };

  return (
    <form role={"search"} onSubmit={submitHandler}>
      <div className={styles.searchForm}>
        <Search
          label="Betalingsmottaker"
          description="Velg hvem du vil se skattekort for"
          hideLabel={false}
          htmlSize="12"
          name={"search"}
        />
        <RadioGroup defaultValue={year} legend="Velg år" name={"year"}>
          <Radio value={year - 1}>{year - 1}</Radio>
          <Radio value={year}>{year}</Radio>
          <Radio value={year + 1}>{year + 1}</Radio>
        </RadioGroup>
      </div>
    </form>
  );
};
export default SkattekortSearch;
