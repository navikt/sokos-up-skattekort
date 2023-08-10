import { z } from "zod";

const Forskuddstrekktype = z.enum(["Trekkprosent", "Trekktabell", "Frikort"] as const);

const Trekkode = z.enum([
  "loennFraHovedarbeidsgiver",
  "loennFraBiarbeidsgiver",
  "loennFraNAV",
  "pensjonFraNAV",
  "ufoeretrygdFraNAV",
  "ufoereytelserFraAndre",
] as const);

const Forskuddstrekk = z.object({
  type: Forskuddstrekktype,
  trekkode: Trekkode,
  frikortbeloep: z.optional(z.number()),
  tabellnummer: z.optional(z.string()),
  prosentsats: z.optional(z.number()),
  antallMaanederForTrekk: z.optional(z.number()),
});

const Skattekort = z.object({
  utstedtDato: z.string().regex(/[0-9]{4}-[0-9]{2}-[0-9]{2}/),
  skattekortidentifikator: z.number(),
  forskuddstrekk: z.array(Forskuddstrekk),
});

const ResultatStatus = z.enum(["ikkeSkattekort", "skattekortopplysningerOK"] as const);

const Tilleggsopplysning = z.enum([
  "oppholdPaaSvalbard",
  "kildeskattpensjonist",
  "oppholdITiltakssone",
  "kildeskattPaaLoenn",
] as const);

const Arbeidstaker = z.object({
  inntektsaar: z.number(),
  arbeidstakeridentifikator: z.string().regex(/[0-9]{11}/),
  resultatPaaForespoersel: ResultatStatus,
  skattekort: z.optional(Skattekort),
  tilleggsopplysning: z.optional(z.array(Tilleggsopplysning)),
});

const Arbeidsgiver = z.object({
  arbeidstaker: z.array(Arbeidstaker),
  arbeidsgiveridentifikator: z.object({
    organisasjonsnummer: z.string().regex(/[0-9]{9}/),
  }),
});

const SkattekortHolder = z.object({
  arbeidsgiver: z.array(Arbeidsgiver),
});
export const SkattekortSchema = z.object({
  skattekortListe: z.array(SkattekortHolder),
});

type SkattekortData = z.infer<typeof SkattekortSchema>;

export default SkattekortData;
