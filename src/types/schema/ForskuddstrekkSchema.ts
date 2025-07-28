import { z } from "zod";
import { ForskuddstrekkTypeSchema } from "./ForskuddstrekkTypeSchema";
import { TrekkodeSchema } from "./TrekkodeSchema";

export const ForskuddstrekkSchema = z.object({
  type: ForskuddstrekkTypeSchema,
  trekkode: TrekkodeSchema,
  frikortbeloep: z.optional(z.number()),
  tabellnummer: z.optional(z.string()),
  prosentsats: z.optional(z.number()),
  antallMaanederForTrekk: z.optional(z.number()),
});
