"use client";

import { FaPlus, FaSearch } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useAssignmentsStore,
  type Assignment,
} from "../../../store/assignmentsStore";
import AssignmentItem from "./AssignmentItem";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const { assignments: allAssignments, deleteAssignment } =
    useAssignmentsStore();
  const [search, setSearch] = useState("");
  const [pendingDelete, setPendingDelete] = useState<Assignment | null>(null);
  const assignments = allAssignments.filter(
    (assignment) =>
      assignment.course === cid &&
      assignment.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div id="wd-assignments">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="relative">
          <FaSearch className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500" />
          <input
            placeholder="Search for Assignments"
            aria-label="Search for Assignments"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            id="wd-search-assignment"
            className="rounded border py-1.5 pr-3 pl-9 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            id="wd-add-assignment-group"
            type="button"
            className="inline-flex items-center gap-1 rounded border px-3 py-1.5 text-sm"
          >
            <FaPlus /> Group
          </button>
          <Link
            id="wd-add-assignment"
            href={`/courses/${cid}/assignments/new`}
            className="inline-flex items-center gap-1 rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
          >
            <FaPlus /> Assignment
          </Link>
        </div>
      </div>
      <h3
        id="wd-assignments-title"
        className="mb-3 flex items-center justify-between rounded bg-neutral-200 p-3 text-lg"
      >
        <span>ASSIGNMENTS 40% of Total</span>
        <button
          type="button"
          className="rounded border bg-white px-2 py-0.5 text-sm"
        >
          <FaPlus />
        </button>
      </h3>
      <ul id="wd-assignment-list" className="m-0 list-none p-0">
        {assignments.map((assignment) => (
          <AssignmentItem
            key={assignment._id}
            cid={cid}
            aid={assignment._id}
            onDelete={() => setPendingDelete(assignment)}
            title={assignment.title}
            details={`Multiple Modules | Not available until ${assignment.available} | Due ${assignment.due} | ${assignment.points} pts`}
          />
        ))}
      </ul>
      {pendingDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="wd-delete-assignment-title"
            className="w-full max-w-md rounded bg-white p-5 shadow-xl"
          >
            <h3
              id="wd-delete-assignment-title"
              className="mb-3 text-xl font-semibold"
            >
              Delete assignment?
            </h3>
            <p className="mb-4">
              Are you sure you want to delete {pendingDelete.title}?
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                autoFocus
                onClick={() => setPendingDelete(null)}
                className="rounded border px-3 py-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteAssignment(pendingDelete._id, cid);
                  setPendingDelete(null);
                }}
                className="rounded bg-red-600 px-3 py-2 text-white"
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
