import { HttpResponse, http } from "msw";
import type { HentNavnRequest } from "../src/types/HentNavnRequest";
import type { HentSkattekortRequest } from "../src/types/HentSkattekortRequestSchema";
import hentNavnResponse from "./navnResponse.json";
import ingenNavnResponse from "./navnResponseMedFeilmelding.json";
import mangeSkattekort from "./responseMedMangeSkattekort.json";
import ingenSkattekort from "./responseUtenSkattekort.json";
export const handlers = [
	http.post(
		"/sokos-skattekort/api/v2/person/hent-skattekort",
		async ({ request }) => {
			const sokeParameter = (await request.json()) as HentSkattekortRequest;
			const skattekort =
				sokeParameter.fnr === "11111111111" ||
				sokeParameter.fnr === "22222222222"
					? ingenSkattekort
					: mangeSkattekort;
			return HttpResponse.json(skattekort, { status: 200 });
		},
	),
	http.post(
		"/sokos-skattekort/api/v2/person/hent-navn",
		async ({ request }) => {
			const sokeParameter = (await request.json()) as HentNavnRequest;
			if (sokeParameter.fnr === "22222222222") {
				return HttpResponse.json(ingenNavnResponse, { status: 200 });
			}
			return HttpResponse.json(hentNavnResponse, { status: 200 });
		},
	),
];
