import { getEnvironment } from "./environment";
import { getWebInstrumentations, initializeFaro } from "@grafana/faro-web-sdk";

type TelemetryCollectorURL =
  | "https://telemetry.nav.no/collect"
  | "https://telemetry.ekstern.dev.nav.no/collect"
  | "http://localhost:12347";

const getTelemetryCollectorURL = (): TelemetryCollectorURL => {
  if (getEnvironment() === "production") {
    return "https://telemetry.nav.no/collect";
  }

  if (getEnvironment() === "development") {
    return "https://telemetry.ekstern.dev.nav.no/collect";
  }

  return "http://localhost:12347";
};

// Fjern "getEnvironment() !== "local" &&" for å kjøre mot grafana på port 12347
export function initGrafanaFaro() {
  getEnvironment() !== "local" &&
    initializeFaro({
      isolate: true,
      url: getTelemetryCollectorURL(),
      app: {
        name: "sokos-up-skattekort",
      },
      instrumentations: [
        ...getWebInstrumentations({
          captureConsole: false,
        }),
      ],
    });
}
