import { Tilleggsopplysning } from "./SkattekortData";

export const TillegsopplysningTekster = new Map<Tilleggsopplysning, string>([
  ["oppholdPaaSvalbard", "Opphold på Svalbard"],
  ["kildeskattpensjonist", "Kildeskatt pensjonist"],
  ["oppholdITiltakssone", "Opphold i tiltakssone"],
  ["kildeskattPaaLoenn", "Kildeskatt på lønn"],
] as const);
