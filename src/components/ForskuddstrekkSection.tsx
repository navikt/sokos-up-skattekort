import { Forskuddstrekk, Forskuddstrekktype, Trekkode } from "../models/Skattekortdata";
import { BodyShort } from "@navikt/ds-react";

type ForskuddstrekkSectionProps = {
  forskuddstrekk: Forskuddstrekk;
};
const ForskuddstrekkSection = ({ forskuddstrekk }: ForskuddstrekkSectionProps) => {
  const tittel = new Map<Trekkode, string>([
    ["loennFraHovedarbeidsgiver", "Lønn fra hovedarbeidsgiver"],
    ["loennFraBiarbeidsgiver", "Lønn fra biarbeidsgiver"],
    ["loennFraNAV", "Lønn fra hovedarbeidsgiver"],
    ["ufoeretrygdFraNAV", "Lønn fra hovedarbeidsgiver"],
    ["ufoereytelserFraAndre", "Lønn fra hovedarbeidsgiver"],
  ]).get(forskuddstrekk.trekkode);

  const prosentsatsEllerFrikort = forskuddstrekk.prosentsats
    ? `Prosentsats: ${forskuddstrekk.prosentsats}`
    : `Frikortbeløp: ${forskuddstrekk.frikortbeloep}`;

  const skalViseTabell = forskuddstrekk.type === "Trekktabell";

  return (
    <>
      <div>
        <BodyShort>{tittel}</BodyShort>
        <BodyShort>{prosentsatsEllerFrikort}</BodyShort>
      </div>
      {skalViseTabell && (
        <div>
          <BodyShort>Tabellnummer: {forskuddstrekk.tabellnummer}</BodyShort>
          <BodyShort>Antall måneder for trekk: {forskuddstrekk.antallMaanederForTrekk}</BodyShort>
        </div>
      )}
    </>
  );
};
export default ForskuddstrekkSection;
