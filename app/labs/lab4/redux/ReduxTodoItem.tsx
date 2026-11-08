import type { ReduxTodo } from "./todosReducer";
export default function ReduxTodoItem({
  todo,
  edit,
  remove,
}: {
  todo: ReduxTodo;
  edit: (todo: ReduxTodo) => void;
  remove: (id: string) => void;
}) {
  return (
    <li id={`wd-redux-todo-${todo.id}`}>
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
