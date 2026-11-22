export const operations = {
  add: (a: number, b: number) => a + b,
  subtract: (a: number, b: number) => a - b,
  multiply: (a: number, b: number) => a * b,
  divide: (a: number, b: number) => a / b,
};

export function calculate(operation: unknown, left: unknown, right: unknown) {
  const a = typeof left === "string" && left.trim() ? Number(left) : NaN;
  const b = typeof right === "string" && right.trim() ? Number(right) : NaN;
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return { error: "Enter two valid numbers." };
  }
  if (typeof operation !== "string" || !Object.hasOwn(operations, operation)) {
    return { error: "Choose add, subtract, multiply, or divide." };
  }
  if (operation === "divide" && b === 0) {
    return { error: "Cannot divide by zero." };
  }

  const result = operations[operation as keyof typeof operations](a, b);
  return Number.isFinite(result)
    ? { a, b, operation, result }
    : { error: "The result is out of range." };
}
