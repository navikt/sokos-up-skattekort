import { BodyShort } from "@navikt/ds-react";

type ArbeidsgiverProps = {
  identifikator: ArbeidsgiverIdentifikator;
};

type ArbeidsgiverIdentifikator = {
  organisasjonsnummer: string;
};

const Arbeidsgiver = ({ identifikator }: ArbeidsgiverProps) => (
  <BodyShort>Arbeidsgiver: {identifikator.organisasjonsnummer}</BodyShort>
);

export default Arbeidsgiver;
