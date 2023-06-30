import { Label } from "@navikt/ds-react";

type ArbeidsgiverProps = {
  identifikator: ArbeidsgiverIdentifikator;
};

type ArbeidsgiverIdentifikator = {
  organisasjonsnummer: string;
};

const Arbeidsgiver = ({ identifikator }: ArbeidsgiverProps) => (
  <Label>Arbeidsgiver: {identifikator.organisasjonsnummer}</Label>
);

export default Arbeidsgiver;
