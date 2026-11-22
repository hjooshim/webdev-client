"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useAccountContext } from "../account/AccountContext";
import { emptyCourse, useCoursesStore } from "../store/coursesStore";
import { enrollInCourse, findCourses, findMyCourses, unenrollFromCourse } from "../client";
import { useRequest } from "@/app/useRequest";
import { httpError } from "@/app/http";
import CourseCard from "./CourseCard";

export default function Dashboard() {
  const { currentUser } = useAccountContext();
  return <CourseDashboard key={currentUser?._id ?? "guest"} userId={currentUser?._id} />;
}

function CourseDashboard({ userId }: { userId?: string }) {
  const { courses, setCourses, addCourse, updateCourse, deleteCourse } = useCoursesStore();
  const [myCourseIds, setMyCourseIds] = useState<string[]>([]);
  const [course, setCourse] = useState({ ...emptyCourse });
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [message, setMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState("");
  const { run, pending, error } = useRequest();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    Promise.all([findCourses(signal), userId ? findMyCourses(signal) : []])
      .then(([allCourses, myCourses]) => {
        if (signal.aborted) return;
        setCourses(allCourses);
        setMyCourseIds(myCourses.map((row) => row._id));
        setLoaded(true);
      })
      .catch((requestError) => {
        if (!signal.aborted) setLoadError(httpError(requestError));
      });
    return () => controller.abort();
  }, [setCourses, userId]);

  const enrolled = (id: string) => myCourseIds.includes(id);
  const visibleCourses =
    !userId || showAllCourses ? courses : courses.filter((row) => enrolled(row._id));
  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userId || !course.name.trim()) return;
    setMessage("");
    void run(async () => {
      if (course._id) {
        await updateCourse(course);
        setMessage("Course updated.");
      } else {
        const added = await addCourse(course);
        setMyCourseIds((ids) => [...ids, added._id]);
        setMessage("Course added.");
      }
      setCourse({ ...emptyCourse });
    });
  };
  const remove = (id: string) => void run(async () => {
    await deleteCourse(id);
    setMyCourseIds((ids) => ids.filter((courseId) => courseId !== id));
    setCourse((draft) => draft._id === id ? { ...emptyCourse } : draft);
  });

  const changeEnrollment = (courseId: string) => {
    if (!userId) return;
    void run(async () => {
      if (enrolled(courseId)) {
        await unenrollFromCourse(userId, courseId);
        setMyCourseIds((ids) => ids.filter((id) => id !== courseId));
      } else {
        await enrollInCourse(userId, courseId);
        setMyCourseIds((ids) => [...ids, courseId]);
      }
    });
  };

  if (loadError) return <p role="alert" className="text-red-700">{loadError}</p>;
  if (!loaded) return <p role="status">Loading courses…</p>;

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
      {error && <p role="alert" className="text-red-700">{error}</p>}
      {userId && (
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
              disabled={pending || !!course._id}
              className="rounded bg-blue-600 px-3 py-2 text-white disabled:opacity-40"
            >
              Add
            </button>
            <button
              id="wd-update-course-click"
              type="submit"
              disabled={pending || !course._id}
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
      )}
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
            signedIn={!!userId}
            onEnrollment={() => changeEnrollment(row._id)}
          />
        ))}
      </div>
    </div>
  );
}
