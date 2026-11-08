"use client";
export default function ClickEvent() {
  return (
    <section
      className="rounded border border-neutral-200 bg-white p-4 shadow-sm"
      id="wd-click-event"
    >
      <h2>Click Event</h2>
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-onclick-hello"
        onClick={() => alert("Hello World!")}
      >
        Click Hello
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-onclick-hyunjoo"
        onClick={() => alert("Hello, Hyunjoo Shim!")}
      >
        Click Hyunjoo
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-onclick-goodbye"
        onClick={() => alert("Goodbye World!")}
      >
        Goodbye
      </button>
    </section>
  );
}
