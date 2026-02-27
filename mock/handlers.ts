import { HttpResponse, http } from "msw";

export const handlers = [
	http.post("/skattekort-api/api/v1/person/hent-skattekort", async () =>
		HttpResponse.json(
			[
				{
					identifikator: "12345678910",
					utstedtDato: "2020-02-20",
					mottatt: "2020-02-20 12:00:00",
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
					identifikator: "12345678912",
					utstedtDato: "2020-02-21",
					mottatt: "2020-02-21 13:37:00",

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
					identifikator: "12345678914",
					utstedtDato: "2020-02-22",
					mottatt: "2020-02-22 11:11:00",

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
