import { create } from "zustand";
import seed from "../database/assignments.json";

export type Assignment = (typeof seed)[number] & {
  until: string;
  group: string;
  displayGrade: string;
  submissionType: string;
  entryOptions: string[];
  assignTo: string;
  notes: string;
};

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
  addAssignment: (assignment: Assignment) => Assignment;
  updateAssignment: (assignment: Assignment) => void;
  deleteAssignment: (id: string, course: string) => void;
};

export const useAssignmentsStore = create<AssignmentsState>((set) => ({
  assignments: seed.map((assignment) => ({
    ...emptyAssignment,
    ...assignment,
  })),
  addAssignment: (assignment) => {
    const added = { ...assignment, _id: crypto.randomUUID() };
    set((state) => ({ assignments: [...state.assignments, added] }));
    return added;
  },
  updateAssignment: (assignment) =>
    set((state) => ({
      assignments: state.assignments.map((row) =>
        row._id === assignment._id && row.course === assignment.course
          ? { ...assignment }
          : row,
      ),
    })),
  deleteAssignment: (id, course) =>
    set((state) => ({
      assignments: state.assignments.filter(
        (row) => row._id !== id || row.course !== course,
      ),
    })),
}));
