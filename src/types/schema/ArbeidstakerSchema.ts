import { z } from "zod";
import { SkattekortSchema } from "./SkattekortSchema";
import { TilleggsopplysningSchema } from "./TilleggsopplysningSchema";
import { ResultatStatusSchema } from "./ResultatStatusSchema";

export const ArbeidstakerSchema = z.object({
  inntektsaar: z.number(),
  arbeidstakeridentifikator: z.string().regex(/[0-9]{11}/),
  resultatPaaForespoersel: ResultatStatusSchema,
  skattekort: z.optional(SkattekortSchema),
  tilleggsopplysning: z.optional(z.array(TilleggsopplysningSchema)),
});
