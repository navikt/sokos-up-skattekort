import { z } from "zod";

export const ArbeidsgiveridentifikatorSchema = z.object({
  organisasjonsnummer: z.string().regex(/[0-9]{9}/),
});
