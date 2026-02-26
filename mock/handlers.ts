import { HttpResponse, http } from "msw";
import { HentSkattekortRequest } from "../src/types/schema/HentSkattekortRequestSchema";

export const handlers = [
	http.post("/skattekort-api/api/v1/person/hent-skattekort", async () =>
		HttpResponse.json(
			[
				{
					utstedtDato: "2020-02-20",
					inntektsaar: 2020,
					resultatForSkattekort: "skattekortopplysningerOK",
					forskuddstrekkList: [
						{
							trekkode: "loennFraNAV",
							frikort: {},
						},
						{
							trekkode: "pensjonFraNAV",
							prosentkort: {
								prosentSats: 65.0,
								antallMndForTrekk: 0,
							},
						},
						{
							trekkode: "ufoeretrygdFraNAV",
							trekktabell: {
								tabell: "7777",
								prosentSats: 45.0,
								antallMndForTrekk: 10.5,
							},
						},
					],
				},
				{
					utstedtDato: "2020-02-21",
					inntektsaar: 2020,
					resultatForSkattekort: "skattekortopplysningerOK",
					forskuddstrekkList: [
						{
							trekkode: "loennFraNAV",
							frikort: {},
						},
						{
							trekkode: "pensjonFraNAV",
							prosentkort: {
								prosentSats: 65.0,
								antallMndForTrekk: 0,
							},
						},
						{
							trekkode: "ufoeretrygdFraNAV",
							trekktabell: {
								tabell: "7777",
								prosentSats: 45.0,
								antallMndForTrekk: 10.5,
							},
						},
					],
					tilleggsopplysningList: ["oppholdPaaSvalbard"],
				},
				{
					utstedtDato: "2020-02-22",
					inntektsaar: 2020,
					resultatForSkattekort: "skattekortopplysningerOK",
					forskuddstrekkList: [
						{
							trekkode: "loennFraNAV",
							frikort: {},
						},
						{
							trekkode: "pensjonFraNAV",
							prosentkort: {
								prosentSats: 65.0,
								antallMndForTrekk: 0,
							},
						},
						{
							trekkode: "ufoeretrygdFraNAV",
							trekktabell: {
								tabell: "7777",
								prosentSats: 45.0,
								antallMndForTrekk: 10.5,
							},
						},
					],
				},
			],
			{ status: 200 },
		),
	),
];
