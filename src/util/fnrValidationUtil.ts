const controlNumberRow1 = [3, 7, 6, 1, 8, 9, 4, 5, 2];
const controlNumberRow2 = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

function isValidPnumber(day: number, month: number): boolean {
  return day > 0 && day <= 31 && month > 0 && month <= 12;
}

function isValidDnumber(day: number, month: number): boolean {
  return day > 40 && day <= 71 && month > 0 && month <= 12;
}

function isValidHnumber(day: number, month: number): boolean {
  return day > 0 && day <= 31 && month > 40 && month <= 52;
}

function isValidDate(day: number, month: number): boolean {
  return isValidPnumber(day, month) || isValidDnumber(day, month) || isValidHnumber(day, month);
}

function isValidFodselsdato(fodselsdato: string): boolean {
  const day = parseInt(fodselsdato.substring(0, 2), 10);
  const month = parseInt(fodselsdato.substring(2, 4), 10);

  return isValidDate(day, month);
}

function getControlDigit(fodselsnummer: number[], controlRow: number[]): number {
  let sum = 0;
  for (let digitNumber = 0; digitNumber < fodselsnummer.length; digitNumber++) {
    sum += fodselsnummer[digitNumber] * controlRow[digitNumber];
  }
  const controlDigit = sum % 11;
  return controlDigit !== 0 ? 11 - controlDigit : 0;
}

export function isValidFodselsnummer(fodselsnummer: string): boolean {
  if (!fodselsnummer.match(/^[0-9]{11}$/)) {
    return false;
  }
  if (!isValidFodselsdato(fodselsnummer.substring(0, 6))) {
    return false;
  }
  const fodselsnummerDigitList = fodselsnummer.split("").map((x: string) => parseInt(x, 10));
  const controlDigit1 = getControlDigit(fodselsnummerDigitList.slice(0, 9), controlNumberRow1);
  const controlDigit2 = getControlDigit(fodselsnummerDigitList.slice(0, 10), controlNumberRow2);
  return fodselsnummerDigitList[9] === controlDigit1 && fodselsnummerDigitList[10] === controlDigit2;
}
