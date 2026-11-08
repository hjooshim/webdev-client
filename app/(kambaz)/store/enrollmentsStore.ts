import { create } from "zustand";
import seed from "../database/enrollments.json";

type Enrollment = (typeof seed)[number];
type EnrollmentsState = {
  enrollments: Enrollment[];
  enroll: (user: string, course: string) => void;
  unenroll: (user: string, course: string) => void;
};

export const useEnrollmentsStore = create<EnrollmentsState>((set) => ({
  enrollments: seed,
  enroll: (user, course) =>
    set((state) => ({
      enrollments: state.enrollments.some(
        (row) => row.user === user && row.course === course,
      )
        ? state.enrollments
        : [...state.enrollments, { _id: crypto.randomUUID(), user, course }],
    })),
  unenroll: (user, course) =>
    set((state) => ({
      enrollments: state.enrollments.filter(
        (row) => row.user !== user || row.course !== course,
      ),
    })),
}));
