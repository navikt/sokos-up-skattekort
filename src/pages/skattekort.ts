import { useEffect, useState } from "react";
import SkattekortData, { SkattekortListeSchema } from "../models/SkattekortData";
import RestService from "../services/rest-service";
import { isValidFodselsnummer } from "../util/fnrValidator";

export function useSkattekortFetch(fnr: string, inntektsaar: number) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [data, setData] = useState<SkattekortData>();

  const submitHandler = () => {
    RestService.hentSkattekort({ fnr, inntektsaar })
      .then((data) => {
        const parsedResult = SkattekortListeSchema.safeParse(data);
        if (!parsedResult.success) {
          console.error("Ugyldig skattekortdataresultat" + parsedResult.error.message);
        } else setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  return { isLoading, error, data, submitHandler };
}

export function useSkattekortSearch(fnrInput: string, inntektsaar: number) {
  const currentYear = new Date().getFullYear();
  const yearOptions = [currentYear - 1, currentYear, currentYear + 1];

  const [fnr, setFnr] = useState(fnrInput);
  const [year, setYear] = useState(inntektsaar);
  const [error, setError] = useState<string>();

  const fnrOnChange = (fnr: string) => {
    if (fnr.match(/^[0-9 .]*$/)) {
      setFnr(fnr);
    }
  };

  const validateFodselsnummer = () => {
    const fnrIsValid = isValidFodselsnummer(fnrInput);
    if (!fnrIsValid) {
      setError("Fødselsnummer er ikke gyldig");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    if (fnr.length === 11) {
      validateFodselsnummer();
    }
  }, [fnr, year]);

  return { fnr, year, setFnr, setYear, error, validateFodselsnummer, fnrOnChange, yearOptions };
}

export type SkattekortSearchOptions = ReturnType<typeof useSkattekortSearch>;
