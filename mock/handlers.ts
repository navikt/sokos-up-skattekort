import { HttpResponse, http } from "msw";
import type { HentSkattekortRequest } from "../src/types/schema/HentSkattekortRequestSchema";
import {
	type Skattekort,
	SkattekortListSchema,
} from "../src/types/schema/SkattekortSchema";
import mangeSkattekort from "./responseMedMangeSkattekort.json";

export const handlers = [
	http.post(
		"/sokos-skattekort/api/v2/person/hent-skattekort",
		async ({ request }) => {
			const sokeParameter = (await request.json()) as HentSkattekortRequest;
			const skattekort =
				sokeParameter.fnr === "11111111111" ? [] : mangeSkattekort;
			const data: Skattekort[] = SkattekortListSchema.parse(skattekort);
			return HttpResponse.json(data, { status: 200 });
		},
	),
	http.post(
		"/sokos-skattekort/api/v2/person/hent-navn",
		async ({ request }) => {
			const sokeParameter = (await request.json()) as HentSkattekortRequest;
			const skattekort =
				sokeParameter.fnr === "11111111111" ? [] : mangeSkattekort;
			return HttpResponse.json(
				{
					navn: "Rudolf Blodstrupmoen",
				},
				{ status: 200 },
			);
		},
	),
];
