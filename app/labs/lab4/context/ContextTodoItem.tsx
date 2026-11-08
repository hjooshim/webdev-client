import type { ContextTodo } from "./todosContext";
export default function ContextTodoItem({
  todo,
  edit,
  remove,
}: {
  todo: ContextTodo;
  edit: (todo: ContextTodo) => void;
  remove: (id: string) => void;
}) {
  return (
    <li id={`wd-context-todo-${todo.id}`}>
      {todo.title}{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        onClick={() => edit(todo)}
      >
        Edit
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        onClick={() => remove(todo.id)}
      >
        Delete
      </button>
    </li>
  );
}
