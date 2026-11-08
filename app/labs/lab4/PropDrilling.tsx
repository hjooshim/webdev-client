"use client";
import { useState } from "react";
type Props = { count: number; setCount: (count: number) => void };
function Grandchild({ count, setCount }: Props) {
  return (
    <div id="wd-prop-drill-grandchild">
      <h4>Grandchild</h4>
      <p>Count: {count}</p>
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        onClick={() => setCount(count + 1)}
      >
        Increment in grandchild
      </button>
    </div>
  );
}
function Middle({ count, setCount }: Props) {
  return (
    <div id="wd-prop-drill-middle">
      <h4>Middle</h4>
      <Grandchild count={count} setCount={setCount} />
    </div>
  );
}
function PersonalMiddle({ count, setCount }: Props) {
  return (
    <div id="wd-prop-drill-personal-middle">
      <h4>Personal middle layer</h4>
      <Middle count={count} setCount={setCount} />
    </div>
  );
}
function Child({ count, setCount }: Props) {
  return (
    <div id="wd-prop-drill-child">
      <h4>Child</h4>
      <p>This component only forwards props.</p>
      <PersonalMiddle count={count} setCount={setCount} />
    </div>
  );
}
export default function PropDrilling() {
  const [count, setCount] = useState(0);
  return (
    <section
      className="rounded border border-neutral-200 bg-white p-4 shadow-sm"
      id="wd-prop-drilling"
    >
      <h2>Prop Drilling</h2>
      <p>Parent count: {count}</p>
      <Child count={count} setCount={setCount} />
    </section>
  );
}
