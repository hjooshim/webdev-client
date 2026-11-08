"use client";
import useLocalStorage from "./useLocalStorage";
const tabs = ["Monday", "Tuesday", "Wednesday"];
export default function LocalStorageDemo() {
  const [tab, setTab] = useLocalStorage("wd-hooks-tab", tabs[0]);
  return (
    <div id="wd-local-storage-demo">
      <h3>useLocalStorage</h3>
      {tabs.map((day) => (
        <button
          type="button"
          className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
          key={day}
          onClick={() => setTab(day)}
          aria-pressed={tab === day}
        >
          {day}
        </button>
      ))}
      <p>Selected: {tab}. Reload the page and it stays selected.</p>
    </div>
  );
}
