import { z } from "zod";
import { TilleggsopplysningSchema } from "./schema/TilleggsopplysningSchema";

export type Tilleggsopplysning = z.infer<typeof TilleggsopplysningSchema>;
