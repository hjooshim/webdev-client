import { useDispatch, useSelector } from "react-redux";
import { up, down, reset, resetPersonal } from "./counterReducer";
import type { RootState } from "./store";
export default function CounterRedux() {
  const count = useSelector((state: RootState) => state.counterReducer.count);
  const dispatch = useDispatch();
  return (
    <div id="wd-redux-counter">
      <h3>Redux Counter: {count}</h3>
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-redux-up-click"
        onClick={() => dispatch(up())}
      >
        Up
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-redux-down-click"
        onClick={() => dispatch(down())}
      >
        Down
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-redux-personal-reset-click"
        onClick={() => dispatch(resetPersonal())}
      >
        My Reset
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-redux-reset-click"
        onClick={() => dispatch(reset())}
      >
        Sample Reset
      </button>
    </div>
  );
}
