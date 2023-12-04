import { z } from "zod";

const ForskuddstrekkTypeSchema = z.enum(["Trekkprosent", "Trekktabell", "Frikort"] as const);

const ResultatStatusSchema = z.enum(["ikkeSkattekort", "skattekortopplysningerOK"] as const);

const TrekkodeSchema = z.enum([
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

export type Trekkode = z.infer<typeof TrekkodeSchema>;

const TilleggsopplysningSchema = z.enum([
  "oppholdPaaSvalbard",
  "kildeskattpensjonist",
  "oppholdITiltakssone",
  "kildeskattPaaLoenn",
] as const);

export type Tilleggsopplysning = z.infer<typeof TilleggsopplysningSchema>;

const ForskuddstrekkSchema = z.object({
  type: ForskuddstrekkTypeSchema,
  trekkode: TrekkodeSchema,
  frikortbeloep: z.optional(z.number()),
  tabellnummer: z.optional(z.string()),
  prosentsats: z.optional(z.number()),
  antallMaanederForTrekk: z.optional(z.number()),
});

export type Forskuddstrekk = z.infer<typeof ForskuddstrekkSchema>;

const SkattekortSchema = z.object({
  utstedtDato: z.string().regex(/[0-9]{4}-[0-9]{2}-[0-9]{2}/),
  skattekortidentifikator: z.number(),
  forskuddstrekk: z.array(ForskuddstrekkSchema),
});

const ArbeidstakerSchema = z.object({
  inntektsaar: z.number(),
  arbeidstakeridentifikator: z.string().regex(/[0-9]{11}/),
  resultatPaaForespoersel: ResultatStatusSchema,
  skattekort: z.optional(SkattekortSchema),
  tilleggsopplysning: z.optional(z.array(TilleggsopplysningSchema)),
});

const ArbeidsgiveridentifikatorSchema = z.object({
  organisasjonsnummer: z.string().regex(/[0-9]{9}/),
});

export type Arbeidsgiveridentifikator = z.infer<typeof ArbeidsgiveridentifikatorSchema>;

const ArbeidsgiverSchema = z.object({
  arbeidstaker: z.array(ArbeidstakerSchema),
  arbeidsgiveridentifikator: ArbeidsgiveridentifikatorSchema,
});

const SkattekortDataSchema = z.object({
  arbeidsgiver: z.array(ArbeidsgiverSchema),
});

export const SkattekortListeSchema = z.object({
  skattekortListe: z.array(SkattekortDataSchema),
});

type SkattekortData = z.infer<typeof SkattekortListeSchema>;

export default SkattekortData;
