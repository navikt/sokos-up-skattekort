import { z } from "zod";
import { SkattekortDataSchema } from "./schema/SkattekortDataSchema";

export type SkattekortData = z.infer<typeof SkattekortDataSchema>;
