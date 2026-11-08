export default function ReduxTodoForm({
  title,
  setTitle,
  editing,
  save,
}: {
  title: string;
  setTitle: (title: string) => void;
  editing: boolean;
  save: () => void;
}) {
  return (
    <div id="wd-redux-todo-form">
      <input
        className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
        id="wd-redux-todo-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-redux-add-todo"
        onClick={save}
      >
        {editing ? "Update" : "Add"}
      </button>
    </div>
  );
}
