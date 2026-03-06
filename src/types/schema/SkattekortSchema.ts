import { object, z } from "zod";

export const SkattekortSchema = z.object({
	utstedtDato: z.optional(z.string()),
	identifikator: z.optional(z.string()),
	opprettet: z.string(),
	id: z.number(),
	inntektsaar: z.number(),
	kilde: z.string(),
	resultatForSkattekort: z.string(),

	forskuddstrekkList: z.array(
		z.object({
			trekkode: z.string(),

			frikort: z.optional(
				object({
					frikortBeloep: z.optional(z.number()),
				}),
			),

			prosentkort: z.optional(
				object({
					prosentSats: z.number(),
					antallMndForTrekk: z.optional(z.number()),
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

	tilleggsopplysningList: z.optional(z.array(z.string())),
});

export const SkattekortListSchema = z.array(SkattekortSchema);
export type Skattekort = z.infer<typeof SkattekortSchema>;

export const Trekkode: { [key: string]: string } = {
	loennFraNAV: "Lønn fra Nav",
	pensjonFraNAV: "Pensjon fra Nav",
	ufoeretrygdFraNAV: "Uføretrygd fra Nav",
};
