import ForskuddstrekkSection from "./ForskuddstrekkSection";
import { SkattekortData } from "../models/SkattekortData";
import styles from "./SkattekortVisning.module.css";
import commonStyles from "../util/commonStyles.module.css";
import { TillegsopplysningTekster } from "../models/TillegsopplysningTekster";
import { isEmpty } from "../util/commonUtils";

type SkattekortvisningProps = {
  data: SkattekortData;
};

const Skattekortvisning = ({ data }: SkattekortvisningProps) => {
  const arbeidsgiver = data[0].arbeidsgiver[0];
  const arbeidstaker = arbeidsgiver.arbeidstaker[0];
  const skattekort = data[0].arbeidsgiver[0].arbeidstaker[0].skattekort;
  const forskuddstrekkList = arbeidstaker.skattekort?.forskuddstrekk ?? [];
  const utstedtTekst = skattekort?.utstedtDato ? `Utstedt dato: ${skattekort.utstedtDato}` : "Ingen skattekort funnet";

  return (
    <div className={styles.skattekortvisning}>
      <div className={styles.skattekortvisning__title}>Skattekort {arbeidstaker.inntektsaar}</div>
      <div>{utstedtTekst}</div>

      <hr className={commonStyles.separator} />

      <div className={commonStyles.bold}>
        Arbeidstaker: {arbeidstaker.arbeidstakeridentifikator.substring(0, 6)}{" "}
        {arbeidstaker.arbeidstakeridentifikator.substring(6)}
      </div>

      {!isEmpty(arbeidstaker.tilleggsopplysning) && (
        <>
          <div className={commonStyles.separator} />
          <div className={commonStyles.bold}>
            Tilleggsopplysning: {TillegsopplysningTekster.get(arbeidstaker.tilleggsopplysning![0])}
          </div>
        </>
      )}

      <div className={styles.skattekortvisning__table}>
        {forskuddstrekkList.map((f) => (
          <ForskuddstrekkSection key={f.trekkode} forskuddstrekk={f} />
        ))}
      </div>
    </div>
  );
};

export default Skattekortvisning;
