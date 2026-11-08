export default function ContextTodoForm({
  editing,
  title,
  setTitle,
  save,
}: {
  editing: string | null;
  title: string;
  setTitle: (title: string) => void;
  save: () => void;
}) {
  return (
    <div id="wd-context-todo-form">
      <input
        className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
        id="wd-context-todo-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-context-add-todo-click"
        onClick={save}
      >
        {editing ? "Update" : "Add"}
      </button>
    </div>
  );
}
