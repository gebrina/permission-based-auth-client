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

export const isMobile = (): boolean => {
  let flag = false;
  const mobileAgentNames = ["Android", "iPhone"];
  const userAgent = navigator.userAgent;

  for (let i = 0; i < mobileAgentNames.length; i++) {
    if (userAgent.includes(mobileAgentNames[i])) {
      flag = true;
      break;
    }
  }
  // consider if user is resizing the window manually
  return flag || window.innerWidth <= 600;
};
