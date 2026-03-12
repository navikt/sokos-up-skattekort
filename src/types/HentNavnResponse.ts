import { z } from "zod";

export const HentNavnResponseSchema = z.string().refine((s) => s.length > 0);

export type HentNavnResponse = z.infer<typeof HentNavnResponseSchema>;
