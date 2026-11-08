"use client";
import { useState } from "react";
export default function BooleanStateVariables() {
  const [done, setDone] = useState(true);
  const [urgent, setUrgent] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <section
      className="rounded border border-neutral-200 bg-white p-4 shadow-sm"
      id="wd-boolean-state-variables"
    >
      <h2>Boolean State Variables</h2>
      <p>{done ? "Done" : "Not done"}</p>
      <label>
        <input
          className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
          id="wd-boolean-checkbox"
          type="checkbox"
          checked={done}
          onChange={() => setDone(!done)}
        />{" "}
        Done
      </label>
      {done && <div>Yay! Done</div>}
      <label>
        <input
          className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
          id="wd-boolean-urgent"
          type="checkbox"
          checked={urgent}
          onChange={() => setUrgent(!urgent)}
        />{" "}
        Urgent
      </label>
      {urgent && <div>Needs attention</div>}
      <label>
        <input
          className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
          id="wd-boolean-saved"
          type="checkbox"
          checked={saved}
          onChange={() => setSaved(!saved)}
        />{" "}
        Saved
      </label>
      {saved && <div>Saved</div>}
    </section>
  );
}
