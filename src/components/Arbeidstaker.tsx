import { Label } from "@navikt/ds-react";
import { Forskuddstrekk } from "../models/Skattekortdata";
import ForskuddstrekkSection from "./ForskuddstrekkSection";
import styles from "../pages/skattekort.module.css";

type ArbeidstakerProps = {
  arbeidstaker: string;
  forskuddstrekk: Array<Forskuddstrekk>;
};
const Arbeidstaker = ({ arbeidstaker, forskuddstrekk }: ArbeidstakerProps) => (
  <div className={styles.arbeidstaker}>
    <Label>Arbeidstaker: {arbeidstaker}</Label>
    {forskuddstrekk.map((f, n) => (
      <ForskuddstrekkSection key={f.trekkode + n} forskuddstrekk={f} />
    ))}
  </div>
);

export default Arbeidstaker;
