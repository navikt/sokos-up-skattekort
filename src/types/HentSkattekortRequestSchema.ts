import { z } from "zod";

export const HentSkattekortRequestSchema = z.object({
	fnr: z.string(),
	inntektsaar: z.optional(z.number()),
	hentAlle: z.boolean(),
});

export type HentSkattekortRequest = z.infer<typeof HentSkattekortRequestSchema>;
