import { calculateSum } from "../../../calculate";
export default async function PathCalculator({
  params,
}: {
  params: Promise<{ a: string; b: string }>;
}) {
  const { a, b } = await params;
  const sum = calculateSum([a, b]);
  return (
    <div id="wd-path-calculator">
      <h1>Calculator – Path Parameters</h1>
      <p>Raw path segments:</p>
      <p>
        a = <code>{a}</code>
      </p>
      <p>
        b = <code>{b}</code>
      </p>
      <h2>Sum = {sum ?? "Invalid number"}</h2>
    </div>
  );
}
