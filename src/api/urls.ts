import { getServerSideEnvironment } from "@utils/environment";

export type ApiUrls = {
  local: string;
  development: string | undefined;
  production: string | undefined;
};

const apiUrls: ApiUrls = {
  local: "http://localhost:3000",
  development: process.env.SOKOS_SKATTEKORT_PERSON_API,
  production: process.env.SOKOS_SKATTEKORT_PERSON_API,
};

function getApiUrl(): string {
  const environment = getServerSideEnvironment();
  const url = apiUrls[environment as keyof ApiUrls];

  if (!url) {
    throw new Error(`API URL is not defined for environment: ${environment}`);
  }

  return url;
}

// export the specific API URL based on the current server-side environment
export const sokosSkattekortPersonApi: string = getApiUrl();
