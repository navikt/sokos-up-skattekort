import { object, z } from "zod";

export const SkattekortSchema = z.object({
	utstedtDato: z.string(),
	identifikator: z.string(),
	mottatt: z.string(),
	inntektsaar: z.number(),
	resultatForSkattekort: z.string(),

	forskuddstrekkList: z.array(
		z.object({
			trekkode: z.string(),

			frikort: z.optional(
				object({
					frikortBeloep: z.number(),
				}),
			),

			prosentkort: z.optional(
				object({
					prosentSats: z.number(),
					antallMndForTrekk: z.number(),
				}),
			),

			trekktabell: z.optional(
				object({
					tabell: z.string(),
					prosentSats: z.number(),
					antallMndForTrekk: z.number(),
				}),
			),
		}),
	),

	tilleggsopplysningList: z.array(z.string()),
});

export type Skattekort = z.infer<typeof SkattekortSchema>;

export const Trekkode: { [key: string]: string } = {
	loennFraNAV: "Lønn fra Nav",
	pensjonFraNAV: "Pensjon fra Nav",
	ufoeretrygdFraNAV: "Uføretrygd fra Nav",
};
