import { Forskuddstrekk } from "../models/SkattekortData";
import { BodyShort, Label } from "@navikt/ds-react";
import styles from "./ForskuddstrekkSection.module.css";
import { TrekkodeTekster } from "../models/TrekkodeTekster";

type ForskuddstrekkSectionProps = {
  forskuddstrekk: Forskuddstrekk;
};
const ForskuddstrekkSection = ({ forskuddstrekk }: ForskuddstrekkSectionProps) => {
  const title = TrekkodeTekster.get(forskuddstrekk.trekkode) ?? forskuddstrekk.trekkode;

  const prosentsatsEllerFrikort = forskuddstrekk.prosentsats
    ? `Prosentsats: ${forskuddstrekk.prosentsats}`
    : `Frikortbeløp: ${forskuddstrekk.frikortbeloep}`;

  const showTable = forskuddstrekk.type === "Trekktabell";

  return (
    <div className={styles.forskuddstrekk}>
      <div>
        <Label className={styles.forskuddstrekk__label}>{title}</Label>
        <BodyShort>{prosentsatsEllerFrikort}</BodyShort>
      </div>
      {showTable && (
        <div className={styles.forskuddstrekk__tabelltrekk}>
          <BodyShort>Tabellnummer: {forskuddstrekk.tabellnummer}</BodyShort>
          <BodyShort>Antall måneder for trekk: {forskuddstrekk.antallMaanederForTrekk}</BodyShort>
        </div>
      )}
    </div>
  );
};
export default ForskuddstrekkSection;
