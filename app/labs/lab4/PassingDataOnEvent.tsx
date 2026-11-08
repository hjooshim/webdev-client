"use client";
const lifeIs = (message: string) => alert(message);
export default function PassingDataOnEvent() {
  return (
    <section
      className="rounded border border-neutral-200 bg-white p-4 shadow-sm"
      id="wd-passing-data-on-event"
    >
      <h2>Passing Data on Event</h2>
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-pass-data-click"
        onClick={() => alert("Hello World!")}
      >
        Pass Data
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-pass-data-parameter-click"
        onClick={() => lifeIs("Life is Good!")}
      >
        Pass Data Parameter
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-pass-data-personal-click"
        onClick={() => lifeIs("Hyunjoo is learning React")}
      >
        Personal Message
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-pass-data-course-click"
        onClick={() => lifeIs("Web Development")}
      >
        Course Message
      </button>
    </section>
  );
}
