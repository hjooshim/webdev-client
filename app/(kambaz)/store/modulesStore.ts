import { create } from "zustand";
import * as client from "../client";
import type { Module } from "./types";

type ModulesState = {
  modules: Module[];
  setModules: (modules: Module[]) => void;
  addModule: (draft: Pick<Module, "name" | "course">) => Promise<void>;
  updateModule: (module: Module) => Promise<void>;
  editModule: (id: string, editing: boolean) => void;
  deleteModule: (id: string) => Promise<void>;
};

export const useModulesStore = create<ModulesState>((set) => ({
  modules: [],
  setModules: (modules) => set({ modules }),
  addModule: async (draft) => {
    const added = await client.createModule(draft);
    set((state) => ({ modules: [...state.modules, added] }));
  },
  updateModule: async (module) => {
    const updated = await client.updateModule(module);
    set((state) => ({
      modules: state.modules.map((row) => row._id === updated._id ? updated : row),
    }));
  },
  editModule: (id, editing) =>
    set((state) => ({
      modules: state.modules.map((row) => row._id === id ? { ...row, editing } : row),
    })),
  deleteModule: async (id) => {
    await client.deleteModule(id);
    set((state) => ({ modules: state.modules.filter((row) => row._id !== id) }));
  },
}));
