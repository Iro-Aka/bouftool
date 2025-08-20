export const getResistancePercentage = (value: number) => {
  return Math.floor((1 - 0.8 ** (value / 100)) * 100);
};

export const getResistanceText = (value: number) => {
  return `${getResistancePercentage(value)}% (${value})`;
};

export const getStatsColor = (value: number, percentage?: boolean) => {
  if (value < 0) {
    return "#D75959";
  } else if (value > 0 || percentage === true) {
    return "#75C059";
  } else {
    return "#9A9B9D";
  }
};
