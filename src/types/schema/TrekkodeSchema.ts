import { z } from "zod";

export const TrekkodeSchema = z.enum([
  "loennFraHovedarbeidsgiver",
  "loennFraBiarbeidsgiver",
  "loennFraNAV",
  "pensjon",
  "pensjonFraNAV",
  "loennTilUtenrikstjenestemann",
  "loennKunTrygdeavgiftTilUtenlandskBorger",
  "loennKunTrygdeavgiftTilUtenlandskBorgerSomGrensegjenger",
  "ufoeretrygdFraNAV",
  "ufoereytelserFraAndre",
  "introduksjonsstoenad",
] as const);
