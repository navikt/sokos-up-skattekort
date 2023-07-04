import { Tilleggsopplysning } from "../models/SkattekortData";
import styles from "./TilleggsopplysningsListe.module.css";
import { Label } from "@navikt/ds-react";
import { TillegsopplysningTekster } from "../models/TillegsopplysningTekster";

type TilleggsopplysningProps = {
  tilleggsopplysninger: Set<Tilleggsopplysning>;
};

const Tilleggsopplysningsliste = ({ tilleggsopplysninger }: TilleggsopplysningProps) => {
  const tilleggsopplysningList = Array.from(tilleggsopplysninger).filter((tilleggsopplysning) =>
    TillegsopplysningTekster.has(tilleggsopplysning)
  );

  return (
    <div className={styles.tilleggsopplysning}>
      <Label>Tilleggsopplysning</Label>
      <ul>
        {/* Bruk <li> for å vise hver tilleggsopplysning */}
        {tilleggsopplysningList.map((tilleggsopplysning) => (
          <li key={tilleggsopplysning}>{TillegsopplysningTekster.get(tilleggsopplysning)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tilleggsopplysningsliste;
