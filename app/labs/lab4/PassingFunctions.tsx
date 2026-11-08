export default function PassingFunctions({
  message,
  theFunction,
  thePersonalFunction,
  theOtherFunction,
}: {
  message: string;
  theFunction: (message: string) => void;
  thePersonalFunction: () => void;
  theOtherFunction: () => void;
}) {
  return (
    <section
      className="rounded border border-neutral-200 bg-white p-4 shadow-sm"
      id="wd-passing-functions"
    >
      <h2>Passing Functions</h2>
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-pass-functions-click"
        onClick={() => theFunction(`From parent: ${message}`)}
      >
        Invoke the Function
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-pass-functions-personal-click"
        onClick={thePersonalFunction}
      >
        Personal Function
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-pass-functions-other-click"
        onClick={theOtherFunction}
      >
        Sample Function
      </button>
    </section>
  );
}
