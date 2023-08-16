import { Label } from "@navikt/ds-react";
import { Tilleggsopplysning } from "../models/SkattekortData";
import { TillegsopplysningTekster } from "../models/TillegsopplysningTekster";
import styles from "./TilleggsopplysningsListe.module.css";

type TilleggsopplysningProps = {
  tilleggsopplysninger: Tilleggsopplysning[];
};

const TilleggsopplysningsListe = ({ tilleggsopplysninger }: TilleggsopplysningProps) => {
  const tilleggsopplysningList = Array.from(tilleggsopplysninger).filter((tilleggsopplysning) =>
    TillegsopplysningTekster.has(tilleggsopplysning),
  );

  return (
    <div className={styles.tilleggsopplysning}>
      <Label>Tilleggsopplysning</Label>
      <ul>
        {tilleggsopplysningList.map((tilleggsopplysning) => (
          <li key={tilleggsopplysning}>{TillegsopplysningTekster.get(tilleggsopplysning)}</li>
        ))}
      </ul>
    </div>
  );
};

export default TilleggsopplysningsListe;
