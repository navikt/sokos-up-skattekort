import axios from "axios";
import { SkattekortPersonRequestBody } from "./models";
import SkattekortData from "../models/SkattekortData";

const BASE_API_URL = "/skattekort-api/api/v1";

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000,
  withCredentials: true,
  headers: { Pragma: "no-cache", "Cache-Control": "no-cache", "Content-Type": "application/json" },
});

const hentSkattekort = async (query: SkattekortPersonRequestBody) => {
  const response = await api.post<SkattekortData>("/hent-skattekort", query);
  return response.data;
};

const RestService = {
  hentSkattekort,
};

export default RestService;
