"use client";

import { useParams } from "next/navigation";

export default function AddPathParameters() {
  const { a, b } = useParams<{ a: string; b: string }>();
  const first = Number(a);
  const second = Number(b);
  const valid = Number.isFinite(first) && Number.isFinite(second);
  return (
    <div id="wd-add-path-parameters">
      <h2>Add Path Parameters</h2>
      {valid ? (
        <p>
          {a} + {b} = {first + second}
        </p>
      ) : (
        <p>Invalid operands: both path segments must be finite numbers.</p>
      )}
    </div>
  );
}
