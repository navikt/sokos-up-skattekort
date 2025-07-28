import { z } from "zod";

export const TilleggsopplysningSchema = z.enum([
  "oppholdPaaSvalbard",
  "kildeskattpensjonist",
  "oppholdITiltakssone",
  "kildeskattPaaLoenn",
] as const);
