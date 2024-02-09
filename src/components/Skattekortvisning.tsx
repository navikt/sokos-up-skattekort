import TilleggsopplysningsListe from "./TilleggsopplysningsListe";
import ForskuddstrekkSection from "./ForskuddstrekkSection";
import { SkattekortData } from "../models/SkattekortData";

type SkattekortvisningProps = {
  data: SkattekortData;
};

const Skattekortvisning = ({ data }: SkattekortvisningProps) => {
  const arbeidsgiver = data[0].arbeidsgiver[0];
  const arbeidstaker = arbeidsgiver.arbeidstaker[0];
  const skattekort = data[0].arbeidsgiver[0].arbeidstaker[0].skattekort;
  const forskuddstrekkList = arbeidstaker.skattekort?.forskuddstrekk ?? [];
  const utstedtTekst = skattekort?.utstedtDato ? `Dato utstedt: ${skattekort.utstedtDato}` : "Ingen skattekort funnet";
  const navn = data[0].navn ?? "N.N.";

  return (
    <>
      <div className="font-bold text-2xl">{navn}</div>
      <div className="flex-col w-fit bg-white shadow-lg mx-12 p-6">
        <div className="w-full text-4xl">Skattekort {arbeidsgiver.arbeidstaker[0].inntektsaar}</div>
        <div className="font-bold">{utstedtTekst}</div>

        <hr className="border-border-subtle my-4" />

        <div className="flex mb-6">
          <div className="flex-col pr-10">
            <div className="font-bold mb-2">
              Arbeidstaker: {arbeidstaker.arbeidstakeridentifikator.substring(0, 6)}{" "}
              {arbeidstaker.arbeidstakeridentifikator.substring(6)}
            </div>
            <div className="font-bold">Arbeidsgiver: {arbeidsgiver.arbeidsgiveridentifikator.organisasjonsnummer}</div>
          </div>
          <div className="flex-col">
            {arbeidstaker.tilleggsopplysning && (
              <TilleggsopplysningsListe tilleggsopplysninger={arbeidstaker.tilleggsopplysning} />
            )}
          </div>
        </div>

        <div className="table-auto border-spacing-x-9 border-spacing-3">
          {forskuddstrekkList.map((f) => (
            <ForskuddstrekkSection key={f.trekkode} forskuddstrekk={f} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Skattekortvisning;
