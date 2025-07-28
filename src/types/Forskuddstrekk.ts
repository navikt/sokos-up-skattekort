import { z } from "zod";
import { ForskuddstrekkSchema } from "./schema/ForskuddstrekkSchema";

export type Forskuddstrekk = z.infer<typeof ForskuddstrekkSchema>;
