"use client";
import useToggle from "./useToggle";
export default function ToggleDemo() {
  const [shown, toggle] = useToggle();
  return (
    <div id="wd-toggle-demo">
      <h3>useToggle</h3>
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-toggle-demo-click"
        onClick={toggle}
      >
        {shown ? "Hide" : "Show"} details
      </button>
      {shown && <p>These details are visible because shown is true.</p>}
    </div>
  );
}
