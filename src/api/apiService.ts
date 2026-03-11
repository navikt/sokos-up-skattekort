import type { AxiosError, AxiosResponse } from "axios";
import useSWRImmutable from "swr/immutable";
import type { ZodError } from "zod";
import { BackendError, NoNameError } from "../types/Error";
import {
	type HentNavnResponse,
	HentNavnResponseSchema,
} from "../types/schema/HentNavnResponse";
import type { HentSkattekortRequest } from "../types/schema/HentSkattekortRequestSchema";
import {
	type Skattekort,
	SkattekortListSchema,
} from "../types/schema/SkattekortResponseDTOSchema";
import {
	type WrappedHentNavnResponseWithError,
	WrappedHentNavnResponseWithErrorSchema,
	type WrappedSkattekortResponseDTOWithError,
	WrappedSkattekortResponseDTOWithErrorSchema,
} from "../types/schema/WrappedResponseWithErrorSchema";
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
	error: AxiosError | ZodError | BackendError | null;
	isLoading: boolean;
} {
	const shouldFetch = fnr?.trim().length > 0;
	const { data, error, isLoading } = useSWRImmutable<Skattekort[]>(
		shouldFetch ? ["/hent-skattekort", fnr] : null,
		{
			...swrConfig<Skattekort[], [string, string]>(
				async ([_url, fnr]: [string, string]) => {
					return api(BASE_URI.SOKOS_SKATTEKORT_API)
						.post<
							HentSkattekortRequest,
							AxiosResponse<WrappedSkattekortResponseDTOWithError>
						>(_url, { fnr, hentAlle: true })
						.then((response) => response.data)
						.then((wrapped) => {
							const error =
								WrappedSkattekortResponseDTOWithErrorSchema.safeParse(wrapped);
							if (error.success) {
								throw new BackendError(error.data.errorMessage);
							}
							return SkattekortListSchema.parse(wrapped.data);
						});
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
	data: string | undefined;
	error: AxiosError | ZodError | BackendError | null;
	isLoading: boolean;
} {
	const shouldFetch = fnr?.trim().length > 0;
	const { data, error, isLoading } = useSWRImmutable<HentNavnResponse>(
		shouldFetch ? ["/hent-navn", fnr] : null,
		{
			...swrConfig<HentNavnResponse, [string, string]>(
				async ([_url, fnr]: [string, string]) => {
					return api(BASE_URI.SOKOS_SKATTEKORT_API)
						.post<
							HentSkattekortRequest,
							AxiosResponse<WrappedHentNavnResponseWithError>
						>(_url, { fnr })
						.then((response) => response.data)
						.then((wrapped: WrappedHentNavnResponseWithError) => {
							const error =
								WrappedHentNavnResponseWithErrorSchema.safeParse(wrapped);
							if (error.success) {
								throw new BackendError(error.data.errorMessage);
							}
							if (!wrapped.data || wrapped.data.length === 0) {
								throw new NoNameError();
							}
							return HentNavnResponseSchema.parse(wrapped.data[0]);
						});
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
	return { data: data?.navn, error, isLoading };
}
