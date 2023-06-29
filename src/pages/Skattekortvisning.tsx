import { BodyLong, Heading, Loader, Panel, Table, TextField } from "@navikt/ds-react";
import Skattekortdata from "../models/Skattekortdata";
import SkattekortHeader from "../components/SkattekortHeader";
import Arbeidsgiver from "../components/Arbeidsgiver";
import Tilleggsopplysningsliste from "../components/Tilleggsopplysningsliste";
import Arbeidstaker from "../components/Arbeidstaker";

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
      <SkattekortHeader ar={arbeidsgiver.arbeidstaker[0].inntektsaar} utstedt={skattekort.utstedtDato} />
      <Arbeidsgiver identifikator={arbeidsgiver.arbeidsgiveridentifikator} />
      {arbeidstaker.tilleggsopplysning && (
        <Tilleggsopplysningsliste tilleggsopplysninger={arbeidstaker.tilleggsopplysning} />
      )}
      <Arbeidstaker arbeidstaker={arbeidstaker.arbeidstakeridentifikator} forskuddstrekk={forskuddstrekk} />
    </>
  );
};

export default Skattekortvisning;
