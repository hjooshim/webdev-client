"use client";
import { CounterProvider } from "./CounterContext";
import ContextCounterRead from "./ContextCounterRead";
import ContextCounterWrite from "./ContextCounterWrite";
import { TodosProvider } from "./todosContext";
import ReactContextTodoList from "./ReactContextTodoList";
export default function ContextExamples() {
  return (
    <section
      className="rounded border border-neutral-200 bg-white p-4 shadow-sm"
      id="wd-context-examples"
    >
      <h2>React Context</h2>
      <CounterProvider>
        <ContextCounterRead />
        <ContextCounterWrite />
      </CounterProvider>
      <TodosProvider>
        <ReactContextTodoList />
      </TodosProvider>
    </section>
  );
}
