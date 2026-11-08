import { create } from "zustand";
export type Todo = { id: string; title: string; done: boolean };
type TodoStore = {
  todos: Todo[];
  todo: Todo;
  setTodo: (todo: Todo) => void;
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (todo: Todo) => void;
  toggleDone: (id: string) => void;
  toggleDonePersonal: (id: string) => void;
};
const emptyTodo: Todo = { id: "-1", title: "Learn Zustand", done: false };
export const useTodoStore = create<TodoStore>((set) => ({
  todos: [
    { id: "1", title: "Learn HTML", done: true },
    { id: "2", title: "Learn CSS", done: true },
    { id: "3", title: "Learn JavaScript", done: false },
  ],
  todo: emptyTodo,
  setTodo: (todo) => set({ todo }),
  addTodo: (todo) =>
    set((state) => ({
      todos: [...state.todos, { ...todo, id: crypto.randomUUID() }],
      todo: emptyTodo,
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
      todo: state.todo.id === id ? emptyTodo : state.todo,
    })),
  updateTodo: (todo) =>
    set((state) => ({
      todos: state.todos.map((item) =>
        item.id === todo.id ? { ...item, title: todo.title } : item,
      ),
      todo: emptyTodo,
    })),
  toggleDone: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    })),
  toggleDonePersonal: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    })),
}));
