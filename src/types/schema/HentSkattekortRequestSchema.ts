import {string, z} from "zod";

export const hentSkattekortRequestSchema = z.object({
    fnr: z.string(),
    inntektsaar: z.optional(z.number()),
    hentAlle: z.boolean()
});

export type HentSkattekortRequest = z.infer<typeof hentSkattekortRequestSchema>;