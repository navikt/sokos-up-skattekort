import { Forskuddstrekk } from "../models/SkattekortData";
import { TrekkodeTekster } from "../models/TrekkodeTekster";

type ForskuddstrekkSectionProps = {
  forskuddstrekk: Forskuddstrekk;
};
const ForskuddstrekkSection = ({ forskuddstrekk }: ForskuddstrekkSectionProps) => {
  const title = TrekkodeTekster.get(forskuddstrekk.trekkode) ?? forskuddstrekk.trekkode;

  const prosentSatsOrFrikort = forskuddstrekk.prosentsats
    ? `Prosentsats: ${forskuddstrekk.prosentsats}`
    : `Frikortbeløp: ${forskuddstrekk.frikortbeloep}`;

  const showTable = forskuddstrekk.type === "Trekktabell";

  return (
    <tr>
      <td className="font-bold whitespace-nowrap">{title}</td>
      <td className="whitespace-nowrap">{prosentSatsOrFrikort}</td>
      {showTable ? <td className="font-bold whitespace-nowrap">Tabell {forskuddstrekk.tabellnummer}</td> : <td></td>}

      {showTable ? (
        <td className="whitespace-nowrap">Antall måneder for trekk: {forskuddstrekk.antallMaanederForTrekk}</td>
      ) : (
        <td></td>
      )}
    </tr>
  );
};
export default ForskuddstrekkSection;
