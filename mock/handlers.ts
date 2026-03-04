import { HttpResponse, http } from "msw";
import type { HentSkattekortRequest } from "../src/types/schema/HentSkattekortRequestSchema";
import { SkattekortListSchema } from "../src/types/schema/SkattekortSchema";
import typisk_svar from "./typisk_svar.json";

export const handlers = [
	http.post(
		"/skattekort-api/api/v2/person/hent-skattekort",
		async ({ request }) => {
			const sokeParameter = (await request.json()) as HentSkattekortRequest;
			const skattekort = sokeParameter.fnr === "11111111111" ? [] : typisk_svar;
			const data = SkattekortListSchema.parse(skattekort);
			return HttpResponse.json(data, { status: 200 });
		},
	),
];
