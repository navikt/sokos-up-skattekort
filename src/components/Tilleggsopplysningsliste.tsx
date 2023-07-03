import { Tilleggsopplysning } from "../models/Skattekortdata";
import styles from "../pages/skattekort.module.css";
import { Label } from "@navikt/ds-react";

type TilleggsoppysningProps = {
  tilleggsopplysninger: Set<Tilleggsopplysning>;
};

const Tilleggsopplysningsliste = ({ tilleggsopplysninger }: TilleggsoppysningProps) => (
  <div className={styles.tilleggsopplysning}>
    <Label>Tilleggsopplysning</Label>
    <ul>
      {Array.from(tilleggsopplysninger).map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  </div>
);

export default Tilleggsopplysningsliste;
