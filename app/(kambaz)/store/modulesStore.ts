import { create } from "zustand";
import seed from "../database/modules.json";
import type { Module } from "./types";

type ModulesState = {
  modules: Module[];
  addModule: (draft: Pick<Module, "name" | "course">) => Module | null;
  updateModule: (module: Module) => void;
  editModule: (id: string) => void;
  deleteModule: (id: string) => void;
};

export const useModulesStore = create<ModulesState>((set) => ({
  modules: seed,
  addModule: ({ name, course }) => {
    if (!name.trim()) return null;
    const added: Module = {
      _id: crypto.randomUUID(),
      name: name.trim(),
      course,
      description: "",
      lessons: [],
    };
    set((state) => ({ modules: [...state.modules, added] }));
    return added;
  },
  updateModule: (module) => {
    if (!module.name.trim()) return;
    set((state) => ({
      modules: state.modules.map((row) =>
        row._id === module._id && row.course === module.course
          ? { ...module, name: module.name.trim() }
          : row,
      ),
    }));
  },
  editModule: (id) =>
    set((state) => ({
      modules: state.modules.map((row) =>
        row._id === id ? { ...row, editing: true } : row,
      ),
    })),
  deleteModule: (id) =>
    set((state) => ({
      modules: state.modules.filter((row) => row._id !== id),
    })),
}));
