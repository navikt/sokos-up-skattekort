import { z } from "zod";
import { ArbeidsgiveridentifikatorSchema } from "./schema/ArbeidsgiveridentifikatorSchema";

export type Arbeidsgiveridentifikator = z.infer<
  typeof ArbeidsgiveridentifikatorSchema
>;
