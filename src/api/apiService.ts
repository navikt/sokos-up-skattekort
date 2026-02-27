import useSWRImmutable from "swr/immutable";
import type { HentSkattekortRequest } from "../types/schema/HentSkattekortRequestSchema";
import type { Skattekort } from "../types/schema/SkattekortSchema";
import { axiosPostFetcher } from "./config/apiConfig";

const BASE_URI = {
	SOKOS_SKATTEKORT_API: "/skattekort-api/api/v1/person/",
};

function swrConfig<T>(fetcher: (uri: string) => Promise<T>) {
	return {
		fetcher,
		suspense: true,
		revalidateOnFocus: false,
		refreshInterval: 600000,
	};
}
type HentSkattekortResponse = { skattekort: Skattekort[] };
export function useFetchSkattekort(fnr: string) {
	const shouldFetch = fnr?.trim().length > 0;
	const { data, error, isValidating } = useSWRImmutable<HentSkattekortResponse>(
		shouldFetch ? "/hent-skattekort" : null,
		{
			...swrConfig<HentSkattekortResponse>((url) =>
				axiosPostFetcher<HentSkattekortRequest, HentSkattekortResponse>(
					BASE_URI.SOKOS_SKATTEKORT_API,
					url,
					{
						fnr,
						hentAlle: true,
					},
				),
			),
			revalidateOnMount: true,
			shouldRetryOnError: true,
			errorRetryCount: 3,
			errorRetryInterval: 3000,
		},
	);
	const isLoading = (!error && !data) || isValidating;
	return { data, error, isLoading };
}
