export const formatNumber = (input: number): string => {
  const numberFormamter = new Intl.NumberFormat("en-US", {
    currency: "USD",
    compactDisplay: "long",
    currencySign: "accounting",
    maximumFractionDigits: 2,
    minimumIntegerDigits: 2,
    style: "currency",
    notation: "standard",
  });

  return numberFormamter.format(input);
};
