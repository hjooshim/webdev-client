import { useRequest } from "@/app/useRequest";
import { useState, type FormEvent } from "react";
import { useModulesStore } from "../../../store/modulesStore";
import type { Module as ModuleData } from "../../../store/types";
import ModuleControlButtons from "./ModuleControlButtons";
import Lesson from "./Lesson";

function RenameModule({ module }: { module: ModuleData }) {
  const [name, setName] = useState(module.name);
  const { updateModule, editModule } = useModulesStore();
  const { run, pending, error } = useRequest();
  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim()) void run(() => updateModule({ ...module, name }));
  };
  return (
    <form onSubmit={save} className="min-w-0 flex-1">
      <input
        aria-label="Module name"
        autoFocus
        disabled={pending}
        value={name}
        onChange={(event) => setName(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape")
            editModule(module._id, false);
        }}
        className="w-full rounded border border-neutral-400 bg-white px-2 py-1"
      />
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
    </form>
  );
}

export default function Module({ module }: { module: ModuleData }) {
  return (
    <li className="wd-module mb-5 overflow-hidden border border-neutral-400 p-0 text-xl">
      <div className="wd-title flex items-center justify-between gap-3 bg-neutral-200 p-3 ps-2">
        {module.editing ? (
          <RenameModule module={module} />
        ) : (
          <span>{module.name}</span>
        )}
        <ModuleControlButtons moduleId={module._id} />
      </div>
      <ul className="wd-lessons m-0 list-none p-0">
        {module.lessons.map((lesson) => (
          <Lesson key={lesson._id} title={lesson.name} />
        ))}
      </ul>
    </li>
  );
}
