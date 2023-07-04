const kontrollRekke1 = [3, 7, 6, 1, 8, 9, 4, 5, 2];
const kontrollRekke2 = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

function erGyldigPnummer(dag: number, maned: number): boolean {
  return dag > 0 && dag <= 31 && maned > 0 && maned <= 12;
}

function erGyldigDNummer(dag: number, maned: number): boolean {
  return dag > 40 && dag <= 71 && maned > 0 && maned <= 12;
}

function erGyldigHNummer(dag: number, maned: number): boolean {
  return dag > 0 && dag <= 31 && maned > 40 && maned <= 52;
}

function erGyldigDato(dag: number, maned: number): boolean {
  return erGyldigPnummer(dag, maned) || erGyldigDNummer(dag, maned) || erGyldigHNummer(dag, maned);
}

function erGyldigFodselsdato(fodselsnummer: string): boolean {
  const dag = parseInt(fodselsnummer.substring(0, 2), 10);
  const maned = parseInt(fodselsnummer.substring(2, 4), 10);

  return erGyldigDato(dag, maned);
}

function hentKontrollSiffer(fodselsnummer: number[], kontrollrekke: number[]): number {
  let sum = 0;
  for (let sifferNummer = 0; sifferNummer < fodselsnummer.length; sifferNummer++) {
    sum += fodselsnummer[sifferNummer] * kontrollrekke[sifferNummer];
  }
  const kontrollSiffer = sum % 11;
  return kontrollSiffer !== 0 ? 11 - kontrollSiffer : 0;
}

export function erGyldigFodselsnummer(fodselsnummer: string): boolean {
  if (!fodselsnummer.match(/^[0-9]{11}$/)) {
    return false;
  }
  if (!erGyldigFodselsdato(fodselsnummer.substring(0, 6))) {
    return false;
  }
  const fodselsnummerListe = fodselsnummer.split("").map((x: string) => parseInt(x, 10));
  const kontrollSiffer1 = hentKontrollSiffer(fodselsnummerListe.slice(0, 9), kontrollRekke1);
  const kontrollSiffer2 = hentKontrollSiffer(fodselsnummerListe.slice(0, 10), kontrollRekke2);
  return fodselsnummerListe[9] === kontrollSiffer1 && fodselsnummerListe[10] === kontrollSiffer2;
}
