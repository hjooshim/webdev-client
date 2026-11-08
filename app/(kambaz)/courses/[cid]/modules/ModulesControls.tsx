import ModuleEditor from "./ModuleEditor";

export default function ModulesControls() {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      <button
        type="button"
        className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm"
      >
        Collapse All
      </button>
      <button
        type="button"
        className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm"
      >
        View Progress
      </button>
      <select
        aria-label="Publish modules"
        defaultValue="publish-all"
        className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm"
      >
        <option value="publish-all">Publish All</option>
      </select>
      <ModuleEditor />
    </div>
  );
}
