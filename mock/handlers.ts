import { HttpResponse, http } from "msw";

export const handlers = [
	http.post("/skattekort-api/api/v1/person/hent-skattekort", () => {
		return HttpResponse.json(
			[
                {
                    "utstedtDato": "2020-02-20",
                    "inntektsaar": 2020,
                    "resultatForSkattekort": "skattekortopplysningerOK",
                    "forskuddstrekkList": [
                        {
                            "trekkode": "loennFraNAV",
                            "frikort": {
                                "frikortBeloep": 0
                            },
                        }
                    ]
                },
                {
                    "utstedtDato": "2020-02-21",
                    "inntektsaar": 2020,
                    "resultatForSkattekort": "skattekortopplysningerOK",
                    "forskuddstrekkList": [
                        {
                            "trekkode": "loennFraNAV",
                            "prosentkort": {
                                "prosentSats": 0,
                                "antallMndForTrekk": 0
                            }
                        }
                    ],
                    "tilleggsopplysningList": [
                        "oppholdPaaSvalbard"
                    ]
                },
                {
                    "utstedtDato": "2020-02-22",
                    "inntektsaar": 2020,
                    "resultatForSkattekort": "skattekortopplysningerOK",
                    "forskuddstrekkList": [
                        {
                            "trekktabell": {
                                "tabell": "string",
                                "prosentSats": 0,
                                "antallMndForTrekk": 0
                            }
                        }
                    ],
                }
			],
			{ status: 200 },
		);
	}),
];
