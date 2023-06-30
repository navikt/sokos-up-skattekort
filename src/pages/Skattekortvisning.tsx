import Skattekortdata from "../models/Skattekortdata";
import SkattekortTitle from "../components/SkattekortTitle";
import Arbeidsgiver from "../components/Arbeidsgiver";
import Tilleggsopplysningsliste from "../components/Tilleggsopplysningsliste";
import Arbeidstaker from "../components/Arbeidstaker";
import styles from "./skattekort.module.css";

type SkattekortvisningProps = {
  data: Skattekortdata;
};
const Skattekortvisning = (props: SkattekortvisningProps) => {
  const { data } = props;
  console.log({ data: JSON.stringify(data) });
  const skattekort = data.skattekortListe[0].arbeidsgiver[0].arbeidstaker[0].skattekort;
  const forskuddstrekk = skattekort.forskuddstrekk;
  const arbeidsgiver = data.skattekortListe[0].arbeidsgiver[0];
  const arbeidstaker = arbeidsgiver.arbeidstaker[0];
  return (
    <>
      <div className={styles.skattekort}>
        <div className={styles.rightTitle}>
          <SkattekortTitle ar={arbeidsgiver.arbeidstaker[0].inntektsaar} utstedt={skattekort.utstedtDato} />
        </div>
        <div className={styles.leftColumn}>
          <Arbeidsgiver identifikator={arbeidsgiver.arbeidsgiveridentifikator} />
          {arbeidstaker.tilleggsopplysning && (
            <Tilleggsopplysningsliste tilleggsopplysninger={arbeidstaker.tilleggsopplysning} />
          )}
        </div>
        <div className={styles.rightColumn}>
          <Arbeidstaker arbeidstaker={arbeidstaker.arbeidstakeridentifikator} forskuddstrekk={forskuddstrekk} />
        </div>
      </div>
    </>
  );
};

export default Skattekortvisning;
