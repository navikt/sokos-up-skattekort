import { Forskuddstrekk } from "../models/SkattekortData";
import { TrekkodeTekster } from "../models/TrekkodeTekster";
import styles from "./ForskuddstrekkSection.module.css";
type ForskuddstrekkSectionProps = {
  forskuddstrekk: Forskuddstrekk;
};
const ForskuddstrekkSection = ({ forskuddstrekk }: ForskuddstrekkSectionProps) => {
  const title = TrekkodeTekster.get(forskuddstrekk.trekkode) ?? forskuddstrekk.trekkode;

  const prosentSatsOrFrikort = forskuddstrekk.prosentsats
    ? `Prosentsats: ${forskuddstrekk.prosentsats}`
    : `Frikortbeløp: ${forskuddstrekk.frikortbeloep}`;

  const showTable = forskuddstrekk.type === "Trekktabell";

  return (
    <div className={styles.forskuddstrekk__row}>
      <div className={styles.forskuddstrekk__bold}>{title}</div>
      <div className={styles.forskuddstrekk__normal}>{prosentSatsOrFrikort}</div>
      {showTable ? (
        <>
          <div className={styles.forskuddstrekk__bold}>Tabell {forskuddstrekk.tabellnummer}</div>
          <div className={styles.forskuddstrekk__normal}>
            Antall måneder for trekk: {forskuddstrekk.antallMaanederForTrekk}
          </div>
        </>
      ) : (
        <>
          <div></div>
          <div></div>
        </>
      )}
    </div>
  );
};
export default ForskuddstrekkSection;
