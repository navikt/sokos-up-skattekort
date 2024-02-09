import { Arbeidsgiveridentifikator } from "../models/SkattekortData";

type ArbeidsgiverProps = {
  identifikator: Arbeidsgiveridentifikator;
};

const Arbeidsgiver = ({ identifikator }: ArbeidsgiverProps) => (
  <div className="font-bold">Arbeidsgiver: {identifikator.organisasjonsnummer}</div>
);

export default Arbeidsgiver;
