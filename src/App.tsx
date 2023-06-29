import "./App.module.css";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Skattekortvisning from "./pages/Skattekortvisning";
import skattekortData from "./pages/skattekortFrikort.json";

const App = ({ gjelderId }: { gjelderId?: string }) => {
  console.log({ skattekortData });
  return <> {skattekortData && <Skattekortvisning data={skattekortData} />}</>;
};

export default App;
