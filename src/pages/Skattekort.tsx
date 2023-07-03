import { useState } from "react";
import SkattekortSearch from "../components/SkattekortSearch";
import Skattekortvisning from "../components/Skattekortvisning";
import useSWR from "swr";
import { skattekortDataUrl } from "../api/urls";
import { fetcher, includeCredentials } from "../api/api";
import SkattekortData from "../models/Skattekortdata";
import { Loader } from "@navikt/ds-react";

type SkattekortPersonRequestBody = {
  fnr: string;
  inntektsaar: number;
};

const Skattekort = () => {
  const [searchBody, setSearchBody] = useState<SkattekortPersonRequestBody>();
  const query = searchBody
    ? {
        path: skattekortDataUrl,
        options: {
          method: "POST",
          body: JSON.stringify(searchBody),
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          includeCredentials,
        },
      }
    : null;
  const { data, isLoading, error } = useSWR<SkattekortData>(query, fetcher);

  const handleSubmit = (fnr: string, year: number) => {
    const searchParameters = { fnr, inntektsaar: year };
    setSearchBody(() => searchParameters);
  };

  const showSkattekort = data && !isLoading && !error && !!data.skattekortListe?.length;

  return (
    <>
      <SkattekortSearch handleSubmit={handleSubmit} />
      {showSkattekort && <Skattekortvisning data={data} />}
      {isLoading && <Loader />}
    </>
  );
};

export default Skattekort;
