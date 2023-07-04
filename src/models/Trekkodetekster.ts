import { Trekkode } from "./Skattekortdata";

export const Trekkodetekster = new Map<Trekkode, string>([
  ["loennFraHovedarbeidsgiver", "Lønn fra hovedarbeidsgiver"],
  ["loennFraBiarbeidsgiver", "Lønn fra biarbeidsgiver"],
  ["loennFraNAV", "Lønn fra NAV"],
  ["pensjonFraNAV", "Pensjon fra NAV"],
  ["ufoeretrygdFraNAV", "Uføretrygd fra NAV"],
  ["ufoereytelserFraAndre", "Uføreytelser fra andre"],
]);
