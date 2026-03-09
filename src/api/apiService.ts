import type { AxiosError } from "axios";
import useSWRImmutable from "swr/immutable";
import type { ZodError } from "zod";
import {
	type HentNavnResponse,
	HentNavnResponseSchema,
} from "../types/schema/HentNavnResponse";
import type { HentSkattekortRequest } from "../types/schema/HentSkattekortRequestSchema";
import {
	type Skattekort,
	SkattekortListSchema,
} from "../types/schema/SkattekortSchema";
import { api } from "./config/apiConfig";

const BASE_URI = {
	SOKOS_SKATTEKORT_API: "/sokos-skattekort/api/v2/person/",
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
	error: AxiosError | ZodError | null;
	isLoading: boolean;
} {
	const shouldFetch = fnr?.trim().length > 0;
	const { data, error, isLoading } = useSWRImmutable<Skattekort[]>(
		shouldFetch ? ["/hent-skattekort", fnr] : null,
		{
			...swrConfig<Skattekort[], [string, string]>(
				async ([_url, fnr]: [string, string]) => {
					return api(BASE_URI.SOKOS_SKATTEKORT_API)
						.post<HentSkattekortRequest>(_url, { fnr, hentAlle: true })
						.then((response) => response.data)
						.then((data) => SkattekortListSchema.parse(data));
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
export function useFetchNavn(fnr: string): {
	data: HentNavnResponse | undefined;
	error: AxiosError | ZodError | null;
	isLoading: boolean;
} {
	const shouldFetch = fnr?.trim().length > 0;
	const { data, error, isLoading } = useSWRImmutable<HentNavnResponse>(
		shouldFetch ? ["/hent-navn", fnr] : null,
		{
			...swrConfig<HentNavnResponse, [string, string]>(
				async ([_url, fnr]: [string, string]) => {
					return api(BASE_URI.SOKOS_SKATTEKORT_API)
						.post<HentSkattekortRequest>(_url, { fnr })
						.then((response) => response.data)
						.then((data) => HentNavnResponseSchema.parse(data));
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
