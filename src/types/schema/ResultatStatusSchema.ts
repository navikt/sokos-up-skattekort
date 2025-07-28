import { z } from "zod";

export const ResultatStatusSchema = z.enum([
  "ikkeSkattekort",
  "skattekortopplysningerOK",
] as const);
