import { Label } from "@navikt/ds-react";
import { Arbeidsgiveridentifikator } from "../models/SkattekortData";

type ArbeidsgiverProps = {
  identifikator: Arbeidsgiveridentifikator;
};

const Arbeidsgiver = ({ identifikator }: ArbeidsgiverProps) => (
  <Label>Arbeidsgiver: {identifikator.organisasjonsnummer}</Label>
);

export default Arbeidsgiver;
