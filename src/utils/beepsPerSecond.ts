const beepsPerSecond = (timePercentage: number): number => {
  const beeps = Math.round(1.049 * 2.71828 ** (0.244 * timePercentage + 1.764 * timePercentage ** 2));
  return beeps > 5 ? 5 : beeps;
}
  

export { beepsPerSecond }
