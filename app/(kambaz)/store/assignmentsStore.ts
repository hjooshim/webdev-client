import { create } from "zustand";
import * as client from "../client";
import type { Assignment } from "./types";
export type { Assignment } from "./types";

export const emptyAssignment: Assignment = {
  _id: "",
  title: "",
  description: "",
  course: "",
  points: 100,
  due: "",
  available: "",
  until: "",
  group: "ASSIGNMENTS",
  displayGrade: "PERCENTAGE",
  submissionType: "ONLINE",
  entryOptions: ["WEBSITE_URL"],
  assignTo: "Everyone",
  notes: "",
};

type AssignmentsState = {
  assignments: Assignment[];
  setAssignments: (assignments: Assignment[]) => void;
  addAssignment: (assignment: Assignment) => Promise<void>;
  updateAssignment: (assignment: Assignment) => Promise<void>;
  deleteAssignment: (id: string) => Promise<void>;
};

export const useAssignmentsStore = create<AssignmentsState>((set) => ({
  assignments: [],
  setAssignments: (assignments) => set({ assignments }),
  addAssignment: async (assignment) => {
    const added = await client.createAssignment(assignment);
    set((state) => ({ assignments: [...state.assignments, added] }));
  },
  updateAssignment: async (assignment) => {
    const updated = await client.updateAssignment(assignment);
    set((state) => ({
      assignments: state.assignments.map((row) => row._id === updated._id ? updated : row),
    }));
  },
  deleteAssignment: async (id) => {
    await client.deleteAssignment(id);
    set((state) => ({ assignments: state.assignments.filter((row) => row._id !== id) }));
  },
}));
