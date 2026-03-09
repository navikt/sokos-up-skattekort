import { z } from "zod";

export const HentNavnResponseSchema = z.object({
	navn: z.string(),
});

export type HentNavnResponse = z.infer<typeof HentNavnResponseSchema>;
