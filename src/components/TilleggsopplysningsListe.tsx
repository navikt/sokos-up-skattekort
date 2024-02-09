import { Tilleggsopplysning } from "../models/SkattekortData";
import { TillegsopplysningTekster } from "../models/TillegsopplysningTekster";

type TilleggsopplysningProps = {
  tilleggsopplysninger: Tilleggsopplysning[];
};

const TilleggsopplysningsListe = ({ tilleggsopplysninger }: TilleggsopplysningProps) => {
  const tilleggsopplysningList = Array.from(tilleggsopplysninger).filter((tilleggsopplysning) =>
    TillegsopplysningTekster.has(tilleggsopplysning),
  );

  return (
    <div className="flex-col">
      <div className="font-bold pb-1">Tilleggsopplysning</div>
      <ul className="list-disc pl-8">
        {tilleggsopplysningList.map((tilleggsopplysning) => (
          <li className="text-xs" key={tilleggsopplysning}>
            {TillegsopplysningTekster.get(tilleggsopplysning)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TilleggsopplysningsListe;
