"use client";
import { useSearchParams } from "next/navigation";
import { calculateSum } from "../calculate";
export default function QueryCalculator() {
  const params = useSearchParams();
  const a = params.get("a") ?? "0";
  const b = params.get("b") ?? "0";
  const c = params.get("c");
  const sum = calculateSum([a, b, c]);
  return (
    <div id="wd-query-calculator">
      <h1>Calculator – Query Parameters</h1>
      <p>Raw query values:</p>
      <p>
        a = <code>{a}</code>
      </p>
      <p>
        b = <code>{b}</code>
      </p>
      {c !== null && (
        <p>
          c = <code>{c}</code>
        </p>
      )}
      <h2>Sum = {sum ?? "Invalid number"}</h2>
    </div>
  );
}
