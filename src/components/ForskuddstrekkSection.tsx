import { Forskuddstrekk } from "../models/SkattekortData";
import { BodyShort, Label } from "@navikt/ds-react";
import styles from "./ForskuddstrekkSection.module.css";
import { TrekkodeTekster } from "../models/TrekkodeTekster";

type ForskuddstrekkSectionProps = {
  forskuddstrekk: Forskuddstrekk;
};
const ForskuddstrekkSection = ({ forskuddstrekk }: ForskuddstrekkSectionProps) => {
  const tittel = TrekkodeTekster.get(forskuddstrekk.trekkode) ?? forskuddstrekk.trekkode;

  const prosentsatsEllerFrikort = forskuddstrekk.prosentsats
    ? `Prosentsats: ${forskuddstrekk.prosentsats}`
    : `Frikortbeløp: ${forskuddstrekk.frikortbeloep}`;

  const skalViseTabell = forskuddstrekk.type === "Trekktabell";

  return (
    <div className={styles.forskuddstrekk}>
      <div>
        <Label>{tittel}</Label>
        <BodyShort>{prosentsatsEllerFrikort}</BodyShort>
      </div>
      {skalViseTabell && (
        <div className={styles.forskuddstrekk__tabelltrekk}>
          <BodyShort>Tabellnummer: {forskuddstrekk.tabellnummer}</BodyShort>
          <BodyShort>Antall måneder for trekk: {forskuddstrekk.antallMaanederForTrekk}</BodyShort>
        </div>
      )}
    </div>
  );
};
export default ForskuddstrekkSection;
