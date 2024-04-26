import axios from "axios";
import { SkattekortRequest } from "./models";
import { SkattekortData } from "../models/SkattekortData";
import { ApiError, HttpStatusCodeError } from "../types/errors";

const BASE_API_URL = "/skattekort-api/api/v1";

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000,
  withCredentials: true,
  headers: { Pragma: "no-cache", "Cache-Control": "no-cache", "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 400) {
      // her kan vi legge feilkoder også som vi fra backend
      throw new HttpStatusCodeError(error.response?.status);
    }
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Uinnlogget - vil ikke skje i miljø da appen er beskyttet
      return Promise.reject(error);
    }
    throw new ApiError("Issues with connection to backend");
  },
);

const fetchSkattekort = async (query: SkattekortRequest) => {
  const response = await api.post<SkattekortData>("/hent-skattekort", query);
  return response.data;
};

const RestService = {
  fetchSkattekort,
};

export default RestService;
