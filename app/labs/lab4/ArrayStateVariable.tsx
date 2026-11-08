"use client";
import { useState } from "react";
export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  return (
    <section
      className="rounded border border-neutral-200 bg-white p-4 shadow-sm"
      id="wd-array-state-variables"
    >
      <h2>Array State Variable</h2>
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-add-element-click"
        onClick={() => setArray([...array, Math.floor(Math.random() * 100)])}
      >
        Add Element
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-personal-clear-array-click"
        onClick={() => setArray([1, 2, 3, 4, 5])}
      >
        My Clear
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-clear-array-click"
        onClick={() => setArray([1, 2, 3, 4, 5])}
      >
        Sample Clear
      </button>
      <ul>
        {array.map((item, index) => (
          <li key={index}>
            {item}{" "}
            <button
              type="button"
              className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
              id={`wd-delete-element-${index}-click`}
              onClick={() => setArray(array.filter((_, i) => i !== index))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
