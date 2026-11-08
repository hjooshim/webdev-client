export function calculateSum(values: (string | null)[]) {
  const numbers = values.map((value) =>
    value === null || value.trim() === "" ? 0 : Number(value),
  );
  return numbers.every(Number.isFinite)
    ? numbers.reduce((sum, value) => sum + value, 0)
    : null;
}
