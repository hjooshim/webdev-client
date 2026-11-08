import { create } from "zustand";
import seed from "../database/courses.json";
import type { Course } from "./types";

export const emptyCourse: Course = {
  _id: "",
  name: "",
  number: "",
  description: "",
  startDate: "2026-11-08",
  endDate: "2026-12-18",
  department: "",
  credits: 3,
  image: "/images/reactjs.jpg",
  term: "Fall 2026",
};

type CoursesState = {
  courses: Course[];
  addCourse: (course: Course) => Course;
  updateCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
};

export const useCoursesStore = create<CoursesState>((set) => ({
  courses: seed,
  addCourse: (course) => {
    const added = { ...course, _id: crypto.randomUUID() };
    set((state) => ({ courses: [...state.courses, added] }));
    return added;
  },
  updateCourse: (course) =>
    set((state) => ({
      courses: state.courses.map((row) =>
        row._id === course._id ? { ...course } : row,
      ),
    })),
  deleteCourse: (id) =>
    set((state) => ({
      courses: state.courses.filter((row) => row._id !== id),
    })),
}));
