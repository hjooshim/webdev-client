import { useTodoStore } from "./todoStore";
export default function ZustandTodoForm() {
  const todo = useTodoStore((state) => state.todo);
  const setTodo = useTodoStore((state) => state.setTodo);
  const addTodo = useTodoStore((state) => state.addTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const editing = useTodoStore((state) =>
    state.todo.id !== "-1" && state.todos.some((item) => item.id === state.todo.id),
  );
  return (
    <div id="wd-zustand-todo-form">
      <input
        className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
        id="wd-zustand-todo-title"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-zustand-add-todo-click"
        onClick={() => {
          if (todo.title.trim()) addTodo(todo);
        }}
      >
        Add
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-zustand-update-todo-click"
        disabled={!editing}
        onClick={() => {
          if (todo.title.trim()) updateTodo(todo);
        }}
      >
        Update
      </button>
    </div>
  );
}
