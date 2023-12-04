import { Heading, Label } from "@navikt/ds-react";
import Arbeidsgiver from "./Arbeidsgiver";
import TilleggsopplysningsListe from "./TilleggsopplysningsListe";
import ForskuddstrekkSection from "./ForskuddstrekkSection";
import Skattekortdata from "../models/SkattekortData";
import styles from "./SkattekortVisning.module.css";

type SkattekortvisningProps = {
  data: Skattekortdata;
};

const Skattekortvisning = ({ data }: SkattekortvisningProps) => {
  const arbeidsgiver = data.skattekortListe[0].arbeidsgiver[0];
  const arbeidstaker = arbeidsgiver.arbeidstaker[0];
  const skattekort = data.skattekortListe[0].arbeidsgiver[0].arbeidstaker[0].skattekort;
  const forskuddstrekkList = arbeidstaker.skattekort?.forskuddstrekk ?? [];
  const utstedtTekst = skattekort?.utstedtDato ? `Utstedt dato ${skattekort.utstedtDato}` : "Ingen skattekort utstedt";

  return (
    <div className={styles.skattekortvisning}>
      <div className={styles.skattekortvisning__rightTitle}>
        <Heading level="3" size="xlarge">
          Skattekort {arbeidsgiver.arbeidstaker[0].inntektsaar}
        </Heading>
        <Heading size={"medium"} spacing>
          {utstedtTekst}
        </Heading>
      </div>
      <div className={styles.skattekortvisning__leftColumn}>
        <Arbeidsgiver identifikator={arbeidsgiver.arbeidsgiveridentifikator} />
        {arbeidstaker.tilleggsopplysning && (
          <TilleggsopplysningsListe tilleggsopplysninger={arbeidstaker.tilleggsopplysning} />
        )}
      </div>
      <div className={styles.skattekortvisning__rightColumn}>
        <Label>Arbeidstaker: {arbeidstaker.arbeidstakeridentifikator}</Label>
        {forskuddstrekkList.map((f) => (
          <ForskuddstrekkSection key={f.trekkode} forskuddstrekk={f} />
        ))}
      </div>
    </div>
  );
};

export default Skattekortvisning;
