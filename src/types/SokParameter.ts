import { z } from "zod";

export const SokParameterSchema = z.object({
	fnr: z
		.string()
		.refine(
			(val) => /^\d{11}$/.test(val),
			"Fødsels eller D-nummer må være 11 siffer",
		),
});

export type SokParameter = z.infer<typeof SokParameterSchema>;
