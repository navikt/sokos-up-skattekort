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

function isValidDateOfBirth(birthNumber: string): boolean {
  const day = parseInt(birthNumber.substring(0, 2), 10);
  const month = parseInt(birthNumber.substring(2, 4), 10);

  return isValidDate(day, month);
}

function getControlDigit(birthNumber: number[], controlRow: number[]): number {
  let sum = 0;
  for (let digitNumber = 0; digitNumber < birthNumber.length; digitNumber++) {
    sum += birthNumber[digitNumber] * controlRow[digitNumber];
  }
  const controlDigit = sum % 11;
  return controlDigit !== 0 ? 11 - controlDigit : 0;
}

export function isValidBirthNumber(birthNumber: string): boolean {
  if (!birthNumber.match(/^[0-9]{11}$/)) {
    return false;
  }
  if (!isValidDateOfBirth(birthNumber.substring(0, 6))) {
    return false;
  }
  const birthNumberList = birthNumber.split("").map((x: string) => parseInt(x, 10));
  const controlDigit1 = getControlDigit(birthNumberList.slice(0, 9), controlNumberRow1);
  const controlDigit2 = getControlDigit(birthNumberList.slice(0, 10), controlNumberRow2);
  return birthNumberList[9] === controlDigit1 && birthNumberList[10] === controlDigit2;
}
