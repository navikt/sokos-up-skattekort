import { Tilleggsopplysning } from "./SkattekortData";

// create a map with all the tilleggsopplysning values
export const TillegsopplysningTekster = new Map<Tilleggsopplysning, string>([
  ["oppholdPaaSvalbard", "Opphold på Svalbard"],
  ["kildeskattpensjonist", "Kildeskatt pensjonist"],
  ["oppholdITiltakssone", "Opphold i tiltakssone"],
  ["kildeskattPaaLoenn", "Kildeskatt på lønn"],
]);
