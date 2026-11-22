import { create } from "zustand";
import * as client from "../client";
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
  setCourses: (courses: Course[]) => void;
  addCourse: (course: Course) => Promise<Course>;
  updateCourse: (course: Course) => Promise<Course>;
  deleteCourse: (id: string) => Promise<void>;
};

export const useCoursesStore = create<CoursesState>((set) => ({
  courses: [],
  setCourses: (courses) => set({ courses }),
  addCourse: async (course) => {
    const added = await client.createCourse(course);
    set((state) => ({ courses: [...state.courses, added] }));
    return added;
  },
  updateCourse: async (course) => {
    const updated = await client.updateCourse(course);
    set((state) => ({
      courses: state.courses.map((row) => row._id === updated._id ? updated : row),
    }));
    return updated;
  },
  deleteCourse: async (id) => {
    await client.deleteCourse(id);
    set((state) => ({ courses: state.courses.filter((row) => row._id !== id) }));
  },
}));
