"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import HelloRedux from "./HelloRedux";
import CounterRedux from "./CounterRedux";
import AddRedux from "./AddRedux";
import ReduxTodos from "./ReduxTodos";
export default function ReduxExamples() {
  return (
    <Provider store={store}>
      <section
        className="rounded border border-neutral-200 bg-white p-4 shadow-sm"
        id="wd-redux-examples"
      >
        <h2>Redux Toolkit</h2>
        <HelloRedux />
        <CounterRedux />
        <AddRedux />
        <ReduxTodos />
      </section>
    </Provider>
  );
}
