import { useState } from "react";
import SkattekortData, { SkattekortListeSchema } from "../models/SkattekortData";
import RestService from "../services/rest-service";
import { isValidFodselsnummer } from "../util/fnrValidator";

export function useSkattekortFetch(fnr: string, inntektsaar: number) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [data, setData] = useState<SkattekortData | null>();
  const [inputError, setInputError] = useState<string>();

  const submitHandler = () => {
    const formattedFodelsnummer = fnr.replace(/[\s.]/g, "");
    if (!isValidFodselsnummer(formattedFodelsnummer)) {
      setInputError("Fødselsnummer er ikke gyldig");
    } else {
      setInputError("");
      RestService.fetchSkattekort({ fnr: formattedFodelsnummer, inntektsaar })
        .then((data) => {
          const parsedResult = SkattekortListeSchema.safeParse(data);
          if (!parsedResult.success) {
            console.error(parsedResult.error.message);
          } else setData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }
  };

  const clearInputErrorOnChange = () => {
    setInputError("");
  };

  return { isLoading, error, data, submitHandler, inputError, clearInputErrorOnChange };
}

export function useSkattekortSearch(fnrInput: string) {
  const currentYear = new Date().getFullYear();
  const yearList = [currentYear - 1, currentYear, currentYear + 1];

  const [fnr, setFnr] = useState(fnrInput);
  const [year, setYear] = useState(currentYear);

  const fnrInputOnChange = (fnr: string) => {
    if (fnr.match(/^[0-9 .]*$/) || fnr === "") {
      setFnr(fnr);
    }
  };

  return { fnr, year, setFnr, setYear, fnrInputOnChange, yearList };
}

export type SkattekortSearchOptions = ReturnType<typeof useSkattekortSearch>;
