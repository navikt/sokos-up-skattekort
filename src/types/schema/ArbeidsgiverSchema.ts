import { z } from "zod";
import { ArbeidstakerSchema } from "./ArbeidstakerSchema";
import { ArbeidsgiveridentifikatorSchema } from "./ArbeidsgiveridentifikatorSchema";

export const ArbeidsgiverSchema = z.object({
  arbeidstaker: z.array(ArbeidstakerSchema),
  arbeidsgiveridentifikator: ArbeidsgiveridentifikatorSchema,
});
