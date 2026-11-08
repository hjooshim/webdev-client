import { useTodoStore, type Todo } from "./todoStore";
export default function ZustandTodoItem({ todo }: { todo: Todo }) {
  const setTodo = useTodoStore((state) => state.setTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const toggleDone = useTodoStore((state) => state.toggleDone);
  const toggleDonePersonal = useTodoStore((state) => state.toggleDonePersonal);
  return (
    <li id={`wd-zustand-todo-${todo.id}`}>
      <label>
        <input
          className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
          type="checkbox"
          checked={todo.done}
          onChange={() => toggleDone(todo.id)}
        />
        <span className={todo.done ? "line-through" : undefined}>
          {todo.title}
        </span>
      </label>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        onClick={() => setTodo(todo)}
      >
        Edit
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        onClick={() => toggleDonePersonal(todo.id)}
      >
        My Toggle
      </button>
    </li>
  );
}
