import { z } from "zod";
import { ForskuddstrekkSchema } from "./ForskuddstrekkSchema";

export const SkattekortSchema = z.object({
  utstedtDato: z.string().regex(/[0-9]{4}-[0-9]{2}-[0-9]{2}/),
  skattekortidentifikator: z.number(),
  forskuddstrekk: z.array(ForskuddstrekkSchema),
});
