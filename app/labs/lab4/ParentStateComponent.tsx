"use client";
import { useState } from "react";
import ChildStateComponent from "./ChildStateComponent";
export default function ParentStateComponent() {
  const [counter, setCounter] = useState(123);
  return (
    <section
      className="rounded border border-neutral-200 bg-white p-4 shadow-sm"
      id="wd-parent-state"
    >
      <h2>Counter {counter}</h2>
      <ChildStateComponent counter={counter} setCounter={setCounter} />
    </section>
  );
}
