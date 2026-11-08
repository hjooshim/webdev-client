import { calculateSum } from "../../../../calculate";
export default async function PathCalculatorThree({
  params,
}: {
  params: Promise<{ a: string; b: string; c: string }>;
}) {
  const { a, b, c } = await params;
  const sum = calculateSum([a, b, c]);
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
      <p>
        c = <code>{c}</code>
      </p>
      <h2>Sum = {sum ?? "Invalid number"}</h2>
    </div>
  );
}
