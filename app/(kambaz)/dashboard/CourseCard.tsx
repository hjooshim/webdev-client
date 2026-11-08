import Image from "next/image";
import Link from "next/link";
import type { Course } from "../store/types";

export default function CourseCard({
  course,
  onEdit,
  onDelete,
  onEnrollment,
  enrolled,
  signedIn,
}: {
  course: Course;
  onEdit: () => void;
  onDelete: () => void;
  onEnrollment: () => void;
  enrolled: boolean;
  signedIn: boolean;
}) {
  const canOpen = !signedIn || enrolled;
  const contents = (
    <>
      <Image
        src={course.image || "/images/reactjs.jpg"}
        width={300}
        height={160}
        alt={course.name}
        className="h-40 w-full object-cover"
      />
      <div className="p-4 pb-0">
        <h5 className="wd-dashboard-course-title m-0 mb-2 truncate text-lg font-semibold whitespace-nowrap">
          {course.name}
        </h5>
        <p className="wd-dashboard-course-description m-0 mb-3 h-[100px] overflow-hidden text-sm text-neutral-600">
          {course.description}
        </p>
      </div>
    </>
  );
  return (
    <div className="wd-dashboard-course w-[300px] max-w-full overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      {canOpen ? (
        <Link
          href={`/courses/${course._id}/home`}
          className="wd-dashboard-course-link block text-neutral-900 no-underline"
        >
          {contents}
        </Link>
      ) : (
        contents
      )}
      <div className="flex flex-wrap gap-2 p-4 pt-0">
        {canOpen && (
          <Link
            href={`/courses/${course._id}/home`}
            className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white no-underline"
          >
            Go
          </Link>
        )}
        <button
          type="button"
          onClick={onEdit}
          className="wd-edit-course rounded border border-blue-600 px-3 py-1.5 text-sm text-blue-700"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="wd-delete-course rounded bg-red-600 px-3 py-1.5 text-sm text-white"
        >
          Delete
        </button>
        {signedIn && (
          <button
            type="button"
            onClick={onEnrollment}
            className={`rounded px-3 py-1.5 text-sm text-white ${enrolled ? "bg-red-600" : "bg-green-700"}`}
          >
            {enrolled ? "Unenroll" : "Enroll"}
          </button>
        )}
      </div>
    </div>
  );
}
