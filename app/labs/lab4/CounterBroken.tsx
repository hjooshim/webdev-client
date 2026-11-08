"use client";
export default function CounterBroken() {
  let count = 7;
  return (
    <section
      className="rounded border border-neutral-200 bg-white p-4 shadow-sm"
      id="wd-counter-broken"
    >
      <h2>Broken Counter: {count}</h2>
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-counter-broken-up-click"
        onClick={() => console.log(++count)}
      >
        Up
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-counter-broken-down-click"
        onClick={() => console.log(--count)}
      >
        Down
      </button>
    </section>
  );
}
