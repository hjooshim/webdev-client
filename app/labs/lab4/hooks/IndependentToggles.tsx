"use client";
import useToggle from "./useToggle";
function Lamp({ label }: { label: string }) {
  const [on, toggle] = useToggle();
  return (
    <button
      type="button"
      className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
      onClick={toggle}
    >
      {label}: {on ? "on" : "off"}
    </button>
  );
}
export default function IndependentToggles() {
  return (
    <div id="wd-independent-toggles">
      <h3>Each caller gets its own state</h3>
      <Lamp label="Kitchen" /> <Lamp label="Porch" />
    </div>
  );
}
