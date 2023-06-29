import { Tilleggsopplysning } from "../models/Skattekortdata";

type TilleggsoppysningProps = {
  tilleggsopplysninger: Set<Tilleggsopplysning>;
};

const Tilleggsopplysningsliste = ({ tilleggsopplysninger }: TilleggsoppysningProps) => (
  <ul>
    {Array.from(tilleggsopplysninger).map((t) => (
      <li>{t}</li>
    ))}
  </ul>
);

export default Tilleggsopplysningsliste;
