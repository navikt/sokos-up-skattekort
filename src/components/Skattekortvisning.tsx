import styles from "./SkattekortVisning.module.css";
import SkattekortTitle from "./SkattekortTitle";
import Arbeidsgiver from "./Arbeidsgiver";
import Arbeidstaker from "./Arbeidstaker";
import Skattekortdata from "../models/SkattekortData";
import TilleggsopplysningsListe from "./TilleggsopplysningsListe";

type SkattekortvisningProps = {
  data: Skattekortdata;
};

const Skattekortvisning = ({ data }: SkattekortvisningProps) => {
  const skattekort = data.skattekortListe[0].arbeidsgiver[0].arbeidstaker[0].skattekort;
  const forskuddstrekk = skattekort.forskuddstrekk;
  const arbeidsgiver = data.skattekortListe[0].arbeidsgiver[0];
  const arbeidstaker = arbeidsgiver.arbeidstaker[0];

  return (
    <div className={styles.skattekortvisning}>
      <div className={styles.skattekortvisning__rightTitle}>
        <SkattekortTitle ar={arbeidsgiver.arbeidstaker[0].inntektsaar} utstedt={skattekort.utstedtDato} />
      </div>
      <div className={styles.skattekortvisning__leftColumn}>
        <Arbeidsgiver identifikator={arbeidsgiver.arbeidsgiveridentifikator} />
        {arbeidstaker.tilleggsopplysning && (
          <TilleggsopplysningsListe tilleggsopplysninger={arbeidstaker.tilleggsopplysning} />
        )}
      </div>
      <div className={styles.skattekortvisning__rightColumn}>
        <Arbeidstaker arbeidstaker={arbeidstaker.arbeidstakeridentifikator} forskuddstrekk={forskuddstrekk} />
      </div>
    </div>
  );
};

export default Skattekortvisning;
