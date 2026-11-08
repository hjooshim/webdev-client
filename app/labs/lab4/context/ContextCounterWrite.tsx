import { useCounterContext } from "./CounterContext";
export default function ContextCounterWrite() {
  const { count, setCount } = useCounterContext();
  return (
    <div id="wd-context-counter-write">
      <h3>Writer</h3>
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-context-up-click"
        onClick={() => setCount(count + 1)}
      >
        Up
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-context-down-click"
        onClick={() => setCount(count - 1)}
      >
        Down
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-context-personal-reset-click"
        onClick={() => setCount(7)}
      >
        My Reset
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-context-reset-click"
        onClick={() => setCount(7)}
      >
        Sample Reset
      </button>
    </div>
  );
}
