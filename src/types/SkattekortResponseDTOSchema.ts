import { object, z } from "zod";

export const ForskuddstrekkSchema = z.object({
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
});

export const SkattekortResponseDTOSchema = z.object({
	utstedtDato: z.optional(z.string()),
	identifikator: z.optional(z.string()),
	opprettet: z.string(),
	id: z.number(),
	inntektsaar: z.number(),
	kilde: z.string(),
	resultatForSkattekort: z.string(),
	forskuddstrekkList: z.array(ForskuddstrekkSchema),
	tilleggsopplysningList: z.optional(z.array(z.string())),
});

export const SkattekortListSchema = z.array(SkattekortResponseDTOSchema);
export type Skattekort = z.infer<typeof SkattekortResponseDTOSchema>;

export const Trekkode: { [key: string]: string } = {
	loennFraNAV: "Lønn fra Nav",
	pensjonFraNAV: "Pensjon fra Nav",
	ufoeretrygdFraNAV: "Uføretrygd fra Nav",
};

export function menneskeleseligKilde(t: string) {
	if (t === "SYNTETISERT") return "Opprettet av Nav";
	else if (t === "SKATTEETATEN") return "Skatteetaten";
	else if (t === "MANUELL") return "Dolly";
	else return t;
}

export function skattekortTittel(skattekort: Skattekort) {
	if (skattekort.resultatForSkattekort === "ikkeSkattekort") {
		if (skattekort.kilde === "SYNTETISERT")
			return "Skattekort opprettet av Nav";
		else if (skattekort.kilde === "SKATTEETATEN")
			return '"Har ikke skattekort" fra Skatteetaten';
		else if (skattekort.kilde === "MANUELL")
			return '"Har ikke skattekort" fra Dolly';
		else return skattekort.kilde;
	}
	if (skattekort.kilde === "SYNTETISERT") return "Skattekort opprettet av Nav";
	else if (skattekort.kilde === "SKATTEETATEN")
		return "Skattekort fra Skatteetaten";
	else if (skattekort.kilde === "MANUELL") return "Skattekort fra Dolly";
	else return skattekort.kilde;
}
