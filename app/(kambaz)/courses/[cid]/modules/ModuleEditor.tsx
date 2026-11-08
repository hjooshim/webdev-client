"use client";

import { useState, type FormEvent } from "react";
import { useParams } from "next/navigation";
import { useModulesStore } from "../../../store/modulesStore";

export default function ModuleEditor() {
  const [show, setShow] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const { cid } = useParams<{ cid: string }>();
  const addModule = useModulesStore((state) => state.addModule);
  const close = () => {
    setModuleName("");
    setShow(false);
  };
  const add = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!moduleName.trim()) return;
    addModule({ name: moduleName, course: cid });
    close();
  };

  return (
    <>
      <button
        id="wd-add-module-btn"
        type="button"
        onClick={() => setShow(true)}
        className="rounded border border-red-600 bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
      >
        + Module
      </button>
      {show && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onKeyDown={(event) => {
            if (event.key === "Escape") close();
          }}
        >
          <form
            onSubmit={add}
            role="dialog"
            aria-modal="true"
            aria-labelledby="wd-module-dialog-title"
            className="w-full max-w-lg rounded bg-white p-5 shadow-xl"
          >
            <div className="mb-4 flex justify-between">
              <h3 id="wd-module-dialog-title" className="text-xl font-semibold">
                Add Module
              </h3>
              <button
                type="button"
                aria-label="Close module dialog"
                onClick={close}
              >
                ×
              </button>
            </div>
            <label htmlFor="wd-module-name" className="mb-1 block">
              Module name
            </label>
            <input
              id="wd-module-name"
              autoFocus
              value={moduleName}
              onChange={(event) => setModuleName(event.target.value)}
              placeholder="Sample module name"
              className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
            />
            <p className="mb-4 text-sm text-neutral-600">
              Try a personal module such as HS Study Notes.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={close}
                className="rounded border px-3 py-2"
              >
                Cancel
              </button>
              <button
                id="wd-add-module"
                type="submit"
                disabled={!moduleName.trim()}
                className="rounded bg-red-600 px-3 py-2 text-white disabled:opacity-40"
              >
                Add Module
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
