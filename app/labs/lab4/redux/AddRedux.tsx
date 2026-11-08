import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "./addReducer";
import type { RootState } from "./store";
export default function AddRedux() {
  const [a, setA] = useState(12);
  const [b, setB] = useState(23);
  const sum = useSelector((state: RootState) => state.addReducer.sum);
  const dispatch = useDispatch();
  return (
    <div id="wd-add-redux">
      <h3>Add Redux</h3>
      <input
        className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
        id="wd-add-redux-a"
        type="number"
        value={a}
        onChange={(e) => setA(Number(e.target.value))}
      />
      <input
        className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
        id="wd-add-redux-b"
        type="number"
        value={b}
        onChange={(e) => setB(Number(e.target.value))}
      />
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-add-redux-click"
        onClick={() => dispatch(add({ a, b }))}
      >
        Add Redux
      </button>
      <h4 id="wd-add-redux-sum">Sum: {sum}</h4>
    </div>
  );
}
