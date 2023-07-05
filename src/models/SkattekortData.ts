export type Skattekort = {
  utstedtDato: string;
  skattekortidentifikator: number;
  forskuddstrekk: Forskuddstrekk[];
};

export type Forskuddstrekktype = "Trekkprosent" | "Trekktabell" | "Frikort";

export type Trekkode =
  | "loennFraHovedarbeidsgiver"
  | "loennFraBiarbeidsgiver"
  | "loennFraNAV"
  | "pensjonFraNAV"
  | "ufoeretrygdFraNAV"
  | "ufoereytelserFraAndre";

export type Forskuddstrekk = {
  type: Forskuddstrekktype;
  trekkode: Trekkode;
  frikortbeloep?: number;
  tabellnummer?: number;
  prosentsats?: number;
  antallMaanederForTrekk?: number;
};

export type Tilleggsopplysning =
  | "oppholdPaaSvalbard"
  | "kildeskattpensjonist"
  | "oppholdITiltakssone"
  | "kildeskattPaaLoenn";

export type ResultatStatus = "ikkeSkattekort" | "skattekortopplysningerOK";

export type Arbeidstaker = {
  inntektsaar: number;
  arbeidstakeridentifikator: string;
  resultatPaaForespoersel: ResultatStatus;
  skattekort: Skattekort;
  tilleggsopplysning?: Set<Tilleggsopplysning>;
};

type Arbeidsgiver = {
  arbeidstaker: Arbeidstaker[];
  arbeidsgiveridentifikator: {
    organisasjonsnummer: string;
  };
};

type SkattekortData = {
  skattekortListe: {
    arbeidsgiver: Arbeidsgiver[];
  }[];
};

export default SkattekortData;
