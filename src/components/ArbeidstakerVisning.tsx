import { Label } from "@navikt/ds-react";
import { Arbeidstaker } from "../models/SkattekortData";
import ForskuddstrekkSection from "./ForskuddstrekkSection";

type ArbeidstakerProps = {
  arbeidstaker: Arbeidstaker;
};
const ArbeidstakerVisning = ({ arbeidstaker }: ArbeidstakerProps) => {
  const forskuddstrekkList = arbeidstaker.skattekort?.forskuddstrekk ?? [];

  return (
    <>
      <Label>Arbeidstaker: {arbeidstaker.arbeidstakeridentifikator}</Label>
      {forskuddstrekkList.map((f, n) => (
        <ForskuddstrekkSection key={f.trekkode + n} forskuddstrekk={f} />
      ))}
    </>
  );
};

export default ArbeidstakerVisning;
