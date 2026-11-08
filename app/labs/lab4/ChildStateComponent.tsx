export default function ChildStateComponent({
  counter,
  setCounter,
}: {
  counter: number;
  setCounter: (counter: number) => void;
}) {
  return (
    <div id="wd-child-state">
      <h3>Counter {counter}</h3>
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-increment-child-state-click"
        onClick={() => setCounter(counter + 1)}
      >
        Increment
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-decrement-child-state-click"
        onClick={() => setCounter(counter - 1)}
      >
        Decrement
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-personal-reset-child-state-click"
        onClick={() => setCounter(123)}
      >
        My Reset
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-reset-child-state-click"
        onClick={() => setCounter(123)}
      >
        Sample Reset
      </button>
    </div>
  );
}
