import { z } from "zod";

export const ForskuddstrekkTypeSchema = z.enum([
  "Trekkprosent",
  "Trekktabell",
  "Frikort",
] as const);
