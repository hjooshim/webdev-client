"use client";
import ZustandCounter from "./ZustandCounter";
import ZustandTodoList from "./ZustandTodoList";
export default function ZustandExamples() {
  return (
    <section
      className="rounded border border-neutral-200 bg-white p-4 shadow-sm"
      id="wd-zustand-examples"
    >
      <h2>Zustand</h2>
      <ZustandCounter />
      <ZustandTodoList />
    </section>
  );
}
