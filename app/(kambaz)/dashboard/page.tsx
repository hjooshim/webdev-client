"use client";

import { useState, type FormEvent } from "react";
import { useAccountContext } from "../account/AccountContext";
import { emptyCourse, useCoursesStore } from "../store/coursesStore";
import { useEnrollmentsStore } from "../store/enrollmentsStore";
import CourseCard from "./CourseCard";

export default function Dashboard() {
  const { courses, addCourse, updateCourse, deleteCourse } = useCoursesStore();
  const { enrollments, enroll, unenroll } = useEnrollmentsStore();
  const { currentUser } = useAccountContext();
  const [course, setCourse] = useState({ ...emptyCourse });
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [message, setMessage] = useState("");
  const enrolled = (id: string) =>
    !!currentUser &&
    enrollments.some(
      (row) => row.user === currentUser._id && row.course === id,
    );
  const visibleCourses =
    !currentUser || showAllCourses
      ? courses
      : courses.filter((row) => enrolled(row._id));
  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!course.name.trim()) return;
    if (course._id) updateCourse({ ...course, name: course.name.trim() });
    else addCourse({ ...course, name: course.name.trim() });
    setMessage(
      course._id
        ? "Course updated."
        : "Course added. Use Enrollments to enroll in your new course.",
    );
    setCourse({ ...emptyCourse });
  };
  const remove = (id: string) => {
    deleteCourse(id);
    if (course._id === id) setCourse({ ...emptyCourse });
  };
  const fieldClass = "w-full rounded border border-neutral-300 px-3 py-2";

  return (
    <div id="wd-dashboard">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <div className="flex gap-2">
          <button
            type="button"
            id="wd-my-enrollments-toggle"
            aria-pressed={showAllCourses}
            onClick={() => setShowAllCourses(!showAllCourses)}
            className="rounded border border-blue-600 px-3 py-2 text-blue-700"
          >
            {showAllCourses ? "My courses" : "All courses"}
          </button>
          <button
            type="button"
            id="wd-enrollments-toggle"
            aria-pressed={showAllCourses}
            onClick={() => setShowAllCourses(!showAllCourses)}
            className="rounded bg-blue-600 px-3 py-2 text-white"
          >
            Enrollments
          </button>
        </div>
      </div>
      <hr />
      <form
        onSubmit={save}
        id="wd-course-form"
        className="my-4 max-w-2xl space-y-3"
      >
        <h2 className="text-xl font-semibold">
          {course._id ? "Edit course" : "New course"}
        </h2>
        <div>
          <label htmlFor="wd-course-name" className="mb-1 block">
            Name
          </label>
          <input
            id="wd-course-name"
            required
            value={course.name}
            onChange={(event) =>
              setCourse({ ...course, name: event.target.value })
            }
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="wd-course-description" className="mb-1 block">
            Description
          </label>
          <textarea
            id="wd-course-description"
            value={course.description}
            onChange={(event) =>
              setCourse({ ...course, description: event.target.value })
            }
            className={fieldClass}
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="wd-my-course-number" className="mb-1 block">
              Course number
            </label>
            <input
              id="wd-my-course-number"
              value={course.number}
              onChange={(event) =>
                setCourse({ ...course, number: event.target.value })
              }
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="wd-course-start-date" className="mb-1 block">
              Start date
            </label>
            <input
              id="wd-course-start-date"
              type="date"
              value={course.startDate}
              onChange={(event) =>
                setCourse({ ...course, startDate: event.target.value })
              }
              className={fieldClass}
            />
          </div>
        </div>
        <div>
          <label htmlFor="wd-course-number" className="mb-1 block">
            Sample course number
          </label>
          <input
            id="wd-course-number"
            value={course.number}
            onChange={(event) =>
              setCourse({ ...course, number: event.target.value })
            }
            className={fieldClass}
          />
        </div>
        <div className="flex gap-2">
          <button
            id="wd-add-course-click"
            type="submit"
            disabled={!!course._id}
            className="rounded bg-blue-600 px-3 py-2 text-white disabled:opacity-40"
          >
            Add
          </button>
          <button
            id="wd-update-course-click"
            type="submit"
            disabled={!course._id}
            className="rounded bg-green-700 px-3 py-2 text-white disabled:opacity-40"
          >
            Update
          </button>
          {course._id && (
            <button
              type="button"
              onClick={() => setCourse({ ...emptyCourse })}
              className="rounded border px-3 py-2"
            >
              Cancel
            </button>
          )}
        </div>
        {message && (
          <p role="status" className="text-sm text-neutral-600">
            {message}
          </p>
        )}
      </form>
      <h2 id="wd-dashboard-published">
        Published Courses ({visibleCourses.length})
      </h2>
      <hr />
      {visibleCourses.length === 0 && (
        <p className="my-4">
          No enrolled courses. Choose Enrollments to browse courses.
        </p>
      )}
      <div
        id="wd-dashboard-courses"
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        {visibleCourses.map((row) => (
          <CourseCard
            key={row._id}
            course={row}
            onEdit={() => {
              setCourse({ ...row });
              setMessage("");
            }}
            onDelete={() => remove(row._id)}
            enrolled={enrolled(row._id)}
            signedIn={!!currentUser}
            onEnrollment={() => {
              if (currentUser) {
                if (enrolled(row._id)) unenroll(currentUser._id, row._id);
                else enroll(currentUser._id, row._id);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
