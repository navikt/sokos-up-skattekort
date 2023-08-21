import axios from "axios";
import { SkattekortRequest } from "./models";
import SkattekortData from "../models/SkattekortData";

const BASE_API_URL = "/skattekort-api/api/v1";

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000,
  withCredentials: true,
  headers: { Pragma: "no-cache", "Cache-Control": "no-cache", "Content-Type": "application/json" },
});

const fetchSkattekort = async (query: SkattekortRequest) => {
  const response = await api.post<SkattekortData>("/hent-skattekort", query);
  return response.data;
};

const RestService = {
  fetchSkattekort,
};

export default RestService;
