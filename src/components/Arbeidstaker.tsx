import { BodyShort } from "@navikt/ds-react";
import { Forskuddstrekk } from "../models/Skattekortdata";
import ForskuddstrekkSection from "./ForskuddstrekkSection";

type ArbeidstakerProps = {
  arbeidstaker: string;
  forskuddstrekk: Array<Forskuddstrekk>;
};
const Arbeidstaker = ({ arbeidstaker, forskuddstrekk }: ArbeidstakerProps) => (
  <>
    <BodyShort>Arbeidstaker: {arbeidstaker}</BodyShort>
    {forskuddstrekk.map((f, n) => (
      <ForskuddstrekkSection key={f.trekkode + n} forskuddstrekk={f} />
    ))}
  </>
);

export default Arbeidstaker;
