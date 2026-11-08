"use client";
import { useEffect, useState } from "react";
export default function Effect() {
  const [name, setName] = useState("Kambaz");
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `${name} — clicked ${count}`;
    console.log(name, count);
  }, [name, count]);
  return (
    <section
      className="rounded border border-neutral-200 bg-white p-4 shadow-sm"
      id="wd-use-effect"
    >
      <h2>useEffect</h2>
      <p>The document title updates when name or count changes.</p>
      <input
        className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
        id="wd-effect-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-effect-count-click"
        onClick={() => setCount(count + 1)}
      >
        Clicked {count}
      </button>
    </section>
  );
}
