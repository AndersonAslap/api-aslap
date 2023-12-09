export const roundPrice = (value: number) => {
  const valueString = value.toString();
  const decimal = Number(valueString.split('.')[1]);

  if (!decimal || decimal < 1) return value;

  const plusValue = decimal > 50 ? 1 : 0.5;

  return Number(valueString.split('.')[0]) + plusValue;
};
