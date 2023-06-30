import { Forskuddstrekk } from "../models/Skattekortdata";
import { BodyShort, Label } from "@navikt/ds-react";
import styles from "../pages/skattekort.module.css";
import { trekkodetekster } from "../models/trekkodetekster";

type ForskuddstrekkSectionProps = {
  forskuddstrekk: Forskuddstrekk;
};
const ForskuddstrekkSection = ({ forskuddstrekk }: ForskuddstrekkSectionProps) => {
  const tittel = trekkodetekster.get(forskuddstrekk.trekkode) ?? forskuddstrekk.trekkode;

  const prosentsatsEllerFrikort = forskuddstrekk.prosentsats
    ? `Prosentsats: ${forskuddstrekk.prosentsats}`
    : `Frikortbeløp: ${forskuddstrekk.frikortbeloep}`;

  const skalViseTabell = forskuddstrekk.type === "Trekktabell";

  return (
    <div className={styles.forskuddstrekk}>
      <div className={styles.prosenttrekk}>
        <Label>{tittel}</Label>
        <BodyShort>{prosentsatsEllerFrikort}</BodyShort>
      </div>
      {skalViseTabell && (
        <div className={styles.tabelltrekk}>
          <BodyShort>Tabellnummer: {forskuddstrekk.tabellnummer}</BodyShort>
          <BodyShort>Antall måneder for trekk: {forskuddstrekk.antallMaanederForTrekk}</BodyShort>
        </div>
      )}
    </div>
  );
};
export default ForskuddstrekkSection;
