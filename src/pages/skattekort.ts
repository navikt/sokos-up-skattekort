import { useEffect, useState } from "react";
import SkattekortData, { SkattekortListeSchema } from "../models/SkattekortData";
import RestService from "../services/rest-service";
import { isValidFodselsnummer } from "../util/fnrValidator";

export function useFetchSkattekort(fnr: string, inntektsaar: number) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [data, setData] = useState<SkattekortData>();

  useEffect(() => {
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
  }, [fnr, inntektsaar]);

  return { isLoading, error, data };
}

export function useSkattekortInput(fnrInput: string, yearInput: number) {
  const [fnr, setFnr] = useState(fnrInput);
  const [year, setYear] = useState(yearInput);
  const [error, setError] = useState<string>();

  const fnrInputHandler = (fnr: string) => {
    if (fnr.match(/^[0-9 .]*$/)) {
      setFnr(fnr);
    }
  };

  const validateFodselsnummer = () => {
    const fnrIsValid = isValidFodselsnummer(fnrInput);
    if (!fnrIsValid) {
      setError("Fødselsnummer er ikke gyldig");
    } else {
      setError(undefined);
    }
  };

  useEffect(() => {
    validateFodselsnummer();
  }, [fnr, year]);

  return { fnr, year, setFnr, setYear, error, validateFodselsnummer, fnrInputHandler };
}

export type SkattekortInutResult = ReturnType<typeof useSkattekortInput>;
