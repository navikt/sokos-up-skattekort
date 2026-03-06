import { HttpResponse, http } from "msw";
import type { HentSkattekortRequest } from "../src/types/schema/HentSkattekortRequestSchema";
import { SkattekortListSchema } from "../src/types/schema/SkattekortSchema";
import mangeSkattekort from "./responseMedMangeSkattekort.json";

export const handlers = [
	http.post(
		"/sokos-skattekort/api/v2/person/hent-skattekort",
		async ({ request }) => {
			const sokeParameter = (await request.json()) as HentSkattekortRequest;
			const skattekort =
				sokeParameter.fnr === "11111111111" ? [] : mangeSkattekort;
			const data = SkattekortListSchema.parse(skattekort);
			return HttpResponse.json(data, { status: 200 });
		},
	),
];
