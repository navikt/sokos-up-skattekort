import { SkattekortData } from "../types/SkattekortData";
import { axiosPostFetcher } from "./apiConfig";
import { SkattekortRequest } from "./models/SkattekortRequest";
import { sokosSkattekortPersonApi } from "./urls";

const BASE_URI = {
  SOKOS_SKATTEKORT_PERSON_API: `${sokosSkattekortPersonApi}/api/v1`,
};

export async function getSkattekort(request: SkattekortRequest) {
  return await axiosPostFetcher<SkattekortRequest, SkattekortData>(
    BASE_URI.SOKOS_SKATTEKORT_PERSON_API,
    "/hent-skattekort",
    request,
  );
}
