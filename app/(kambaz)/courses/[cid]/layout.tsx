"use client";

import { useEffect, useState, type ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import { notFound, useParams, useRouter } from "next/navigation";
import { useCoursesStore } from "../../store/coursesStore";
import { useEnrollmentsStore } from "../../store/enrollmentsStore";
import { useAccountContext } from "../../account/AccountContext";
import Breadcrumb from "./Breadcrumb";
import CourseNavigation from "./Navigation";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams<{ cid: string }>();
  const course = useCoursesStore((state) =>
    state.courses.find((row) => row._id === cid),
  );
  const enrollments = useEnrollmentsStore((state) => state.enrollments);
  const { currentUser } = useAccountContext();
  const [showCourseNav, setShowCourseNav] = useState(true);
  const router = useRouter();
  const allowed =
    !currentUser ||
    enrollments.some(
      (row) => row.user === currentUser._id && row.course === cid,
    );
  useEffect(() => {
    if (!allowed) router.replace("/dashboard");
  }, [allowed, router]);
  if (!course) notFound();
  if (!allowed) return null;

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
