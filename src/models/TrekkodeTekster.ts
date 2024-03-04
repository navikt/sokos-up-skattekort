import { Trekkode } from "./SkattekortData";

export const TrekkodeTekster = new Map<Trekkode, string>([
  ["loennFraHovedarbeidsgiver", "Hovedinntekt"],
  ["loennFraBiarbeidsgiver", "Annen inntekt"],
  ["loennFraNAV", "Lønn fra NAV"],
  ["pensjon", "Pensjon"],
  ["pensjonFraNAV", "Pensjon fra NAV"],
  ["loennTilUtenrikstjenestemann", "Lønn til utenrikstjenestemann"],
  ["loennKunTrygdeavgiftTilUtenlandskBorger", "Lønn kun trygdeavgift til utenlandsk borger"],
  [
    "loennKunTrygdeavgiftTilUtenlandskBorgerSomGrensegjenger",
    "Lønn kun trygdeavgift til utenlandsk borger som grensegjenger",
  ],
  ["ufoeretrygdFraNAV", "Uføretrygd fra NAV"],
  ["ufoereytelserFraAndre", "Uføreytelser fra andre"],
  ["introduksjonsstoenad", "Introduksjonsstønad"],
] as const);
