import { z } from "zod";
import { ArbeidsgiverSchema } from "./ArbeidsgiverSchema";

export const SkattekortDataSchema = z.array(
  z.object({
    navn: z.optional(z.string()),
    arbeidsgiver: z.array(ArbeidsgiverSchema),
  }),
);
