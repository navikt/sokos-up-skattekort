import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
// import skattekortdata from './data/ikkeSkattekort.json'
// import skattekortdata from './data/navnUtenSkattekort.json'
// import skattekortdata from './data/skattekortFrikort.json'
// import skattekortdata from './data/skattekortMedTabelltrekk.json'
import skattekortdata from "./data/skattekortMedTilleggsopplysning.json";
// import skattekortdata from './data/skattekortUtenNavn.json'
// import skattekortdata from './data/tomtSvar.json'

const api = new Hono();

// Enable CORS for all routes
api.use(
  "/*",
  cors({
    origin: "http://localhost:4321",
    credentials: true,
  }),
);

api.post("/api/v1/hent-skattekort", async (c) => {
  const skattekortRequest = await c.req.json();
  console.log("SkattekortRequest:", skattekortRequest);
  return Response.json(skattekortdata, { status: 200 });
});

serve(api);
