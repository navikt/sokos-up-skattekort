import { z } from "zod";

export const HentNavnRequestSchema = z.object({
	fnr: z.string(),
});

export type HentNavnRequest = z.infer<typeof HentNavnRequestSchema>;
