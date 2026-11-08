"use client";
import { useState } from "react";
export default function Counter() {
  const [count, setCount] = useState(7);
  return (
    <section
      className="rounded border border-neutral-200 bg-white p-4 shadow-sm"
      id="wd-counter"
    >
      <h2>Counter: {count}</h2>
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-counter-up-click"
        onClick={() => setCount(count + 1)}
      >
        Up
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-counter-down-click"
        onClick={() => setCount(count - 1)}
      >
        Down
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-counter-personal-reset-click"
        onClick={() => setCount(7)}
      >
        My Reset
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-counter-reset-click"
        onClick={() => setCount(7)}
      >
        Sample Reset
      </button>
    </section>
  );
}
