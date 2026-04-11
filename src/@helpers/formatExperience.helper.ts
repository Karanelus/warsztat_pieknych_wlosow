export const formatExperience = (years: number): string => {
  if (years === 1) {
    return `${years} rok doświadczenia`;
  }

  const lastDigit = years % 10;
  const lastTwoDigits = years % 100;

  if (
    lastDigit >= 2 &&
    lastDigit <= 4 &&
    !(lastTwoDigits >= 12 && lastTwoDigits <= 14)
  ) {
    return `${years} lata doświadczenia`;
  }

  return `${years} lat doświadczenia`;
};
