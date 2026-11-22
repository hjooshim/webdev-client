"use client";

import { useEffect, useState, type ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import { notFound, useParams, useRouter } from "next/navigation";
import { findCourse, findModules, findAssignments, getEnrollments } from "../../client";
import { useAssignmentsStore } from "../../store/assignmentsStore";
import { useModulesStore } from "../../store/modulesStore";
import type { Course } from "../../store/types";
import { hasStatus, httpError } from "@/app/http";
import { useAccountContext } from "../../account/AccountContext";
import Breadcrumb from "./Breadcrumb";
import CourseNavigation from "./Navigation";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams<{ cid: string }>();
  const { currentUser } = useAccountContext();
  return (
    <CourseLayout key={`${cid}/${currentUser?._id ?? "guest"}`} cid={cid} userId={currentUser?._id}>
      {children}
    </CourseLayout>
  );
}

function CourseLayout({
  cid,
  userId,
  children,
}: {
  cid: string;
  userId?: string;
  children: ReactNode;
}) {
  const [course, setCourse] = useState<Course>();
  const [error, setError] = useState("");
  const [missing, setMissing] = useState(false);
  const [showCourseNav, setShowCourseNav] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    async function load() {
      try {
        const record = await findCourse(cid, signal);
        if (userId) {
          const enrollments = await getEnrollments(signal);
          if (signal.aborted) return;
          if (!enrollments.some((row) => row.course === cid)) {
            router.replace("/dashboard");
            return;
          }
        }
        const [modules, assignments] = await Promise.all([
          findModules(cid, signal),
          findAssignments(cid, signal),
        ]);
        if (signal.aborted) return;
        useModulesStore.getState().setModules(modules);
        useAssignmentsStore.getState().setAssignments(assignments);
        setCourse(record);
      } catch (requestError) {
        if (signal.aborted) return;
        if (hasStatus(requestError, 404)) setMissing(true);
        else setError(httpError(requestError));
      }
    }
    void load();
    return () => controller.abort();
  }, [cid, router, userId]);

  if (missing) notFound();
  if (error) return <p role="alert" className="text-red-700">{error}</p>;
  if (!course) return <p role="status">Loading course…</p>;

  return (
    <div id="wd-courses">
      <h2 className="text-2xl font-semibold text-red-600">
        <button
          type="button"
          id="wd-course-navigation-toggle"
          aria-label="Toggle course navigation"
          aria-expanded={showCourseNav}
          onClick={() => setShowCourseNav(!showCourseNav)}
          className="me-4"
        >
          <FaAlignJustify className="mb-1 inline text-xl" />
        </button>
        <Breadcrumb course={course} />{" "}
        <span className="text-base font-normal">({course._id})</span>
      </h2>
      <hr className="my-3" />
      <div className="flex gap-4">
        {showCourseNav && (
          <div className="hidden w-[140px] shrink-0 md:block">
            <CourseNavigation cid={cid} />
          </div>
        )}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
