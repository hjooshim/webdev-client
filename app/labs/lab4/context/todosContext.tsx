import { createContext, useContext, useState, type ReactNode } from "react";
export type ContextTodo = { id: string; title: string };
type TodosContextValue = {
  todos: ContextTodo[];
  addTodo: (title: string) => void;
  updateTodo: (todo: ContextTodo) => void;
  deleteTodo: (id: string) => void;
};
const TodosContext = createContext<TodosContextValue | null>(null);
export function TodosProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<ContextTodo[]>([
    { id: "1", title: "Learn HTML" },
    { id: "2", title: "Learn CSS" },
    { id: "3", title: "Learn JavaScript" },
  ]);
  const addTodo = (title: string) =>
    setTodos((previous) => [...previous, { id: crypto.randomUUID(), title }]);
  const updateTodo = (todo: ContextTodo) =>
    setTodos((previous) =>
      previous.map((item) => (item.id === todo.id ? todo : item)),
    );
  const deleteTodo = (id: string) =>
    setTodos((previous) => previous.filter((item) => item.id !== id));
  return (
    <TodosContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodosContext.Provider>
  );
}
export function useTodosContext() {
  const value = useContext(TodosContext);
  if (!value) throw new Error("TodosProvider required");
  return value;
}
