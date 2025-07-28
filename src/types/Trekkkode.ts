import { z } from "zod";
import { TrekkodeSchema } from "./schema/TrekkodeSchema";

export type Trekkode = z.infer<typeof TrekkodeSchema>;
