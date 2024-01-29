export const extractColorFromGradient = (val: string) => {
  const regex = /rgba?\([^)]+\)/g;

  const matches = val.match(regex);

  if (!matches || matches.length < 2) {
    return null;
  }

  const colors = matches.slice(0, 2);

  return colors;
};
