import type { AxiosError } from "axios";
import useSWRImmutable from "swr/immutable";
import type { HentSkattekortRequest } from "../types/schema/HentSkattekortRequestSchema";
import type { Skattekort } from "../types/schema/SkattekortSchema";
import { axiosPostFetcher } from "./config/apiConfig";

const BASE_URI = {
	SOKOS_SKATTEKORT_API: "/skattekort-api/api/v1/person/",
};

function swrConfig<T, ArgType>(fetcher: (arg: ArgType) => Promise<T>) {
	return {
		fetcher,
		revalidateOnFocus: false,
		refreshInterval: 600000,
	};
}

export function useFetchSkattekort(fnr: string): {
	data: Skattekort[] | undefined;
	error: AxiosError | null;
	isLoading: boolean;
} {
	const shouldFetch = fnr?.trim().length > 0;
	const { data, error, isLoading } = useSWRImmutable<Skattekort[]>(
		shouldFetch ? ["/hent-skattekort", fnr] : null,
		{
			...swrConfig<Skattekort[], [string, string]>(
				async ([_url, fnr]: [string, string]) => {
					return axiosPostFetcher<HentSkattekortRequest, Skattekort[]>(
						BASE_URI.SOKOS_SKATTEKORT_API,
						_url,
						{
							fnr,
							hentAlle: true,
						},
					);
				},
			),
			onError: (error) => {
				return { data: [], error, isValidating: false };
			},
			revalidateOnMount: true,
			shouldRetryOnError: true,
			errorRetryCount: 1,
			errorRetryInterval: 3000,
		},
	);
	return { data, error, isLoading };
}
