import { Label } from "@navikt/ds-react";
import { Forskuddstrekk } from "../models/Skattekortdata";
import ForskuddstrekkSection from "./ForskuddstrekkSection";

type ArbeidstakerProps = {
  arbeidstaker: string;
  forskuddstrekk: Array<Forskuddstrekk>;
};
const Arbeidstaker = ({ arbeidstaker, forskuddstrekk }: ArbeidstakerProps) => (
  <>
    <Label>Arbeidstaker: {arbeidstaker}</Label>
    {forskuddstrekk.map((f, n) => (
      <ForskuddstrekkSection key={f.trekkode + n} forskuddstrekk={f} />
    ))}
  </>
);

export default Arbeidstaker;
