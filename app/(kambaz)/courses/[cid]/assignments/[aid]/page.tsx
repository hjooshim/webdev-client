"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import {
  emptyAssignment,
  useAssignmentsStore,
  type Assignment,
} from "../../../../store/assignmentsStore";

function AssignmentForm({
  initial,
  cid,
  aid,
}: {
  initial: Assignment;
  cid: string;
  aid: string;
}) {
  const [assignment, setAssignment] = useState({ ...initial });
  const { addAssignment, updateAssignment } = useAssignmentsStore();
  const router = useRouter();
  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!assignment.title.trim()) return;
    const draft = {
      ...assignment,
      title: assignment.title.trim(),
      course: cid,
    };
    if (aid === "new") addAssignment(draft);
    else updateAssignment(draft);
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <form id="wd-assignments-editor" onSubmit={save} className="max-w-2xl">
      <div className="mb-4">
        <label htmlFor="wd-name" className="mb-1 block font-medium">
          Assignment Name
        </label>
        <input
          id="wd-name"
          required
          value={assignment.title}
          onChange={(event) =>
            setAssignment({ ...assignment, title: event.target.value })
          }
          className="w-full rounded border border-neutral-300 px-3 py-2"
        />
        <p className="mt-1 text-sm text-neutral-600">Assignment id: {aid}</p>
      </div>
      <div className="mb-4">
        <label htmlFor="wd-description" className="mb-1 block font-medium">
          Description
        </label>
        <textarea
          id="wd-description"
          rows={5}
          value={assignment.description}
          onChange={(event) =>
            setAssignment({ ...assignment, description: event.target.value })
          }
          className="w-full rounded border border-neutral-300 px-3 py-2"
        />
      </div>
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
        <label
          htmlFor="wd-points"
          className="font-medium sm:w-40 sm:text-right"
        >
          Points
        </label>
        <input
          id="wd-points"
          type="number"
          min="0"
          required
          value={assignment.points}
          onChange={(event) =>
            setAssignment({ ...assignment, points: Number(event.target.value) })
          }
          className="w-full flex-1 rounded border border-neutral-300 px-3 py-2"
        />
      </div>
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
        <label htmlFor="wd-group" className="font-medium sm:w-40 sm:text-right">
          Assignment Group
        </label>
        <select
          id="wd-group"
          value={assignment.group}
          onChange={(event) =>
            setAssignment({ ...assignment, group: event.target.value })
          }
          className="w-full flex-1 rounded border border-neutral-300 bg-white px-3 py-2"
        >
          <option value="ASSIGNMENTS">ASSIGNMENTS</option>
          <option value="QUIZZES">QUIZZES</option>
          <option value="EXAMS">EXAMS</option>
          <option value="PROJECT">PROJECT</option>
        </select>
      </div>
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
        <label
          htmlFor="wd-display-grade-as"
          className="font-medium sm:w-40 sm:text-right"
        >
          Display Grade as
        </label>
        <select
          id="wd-display-grade-as"
          value={assignment.displayGrade}
          onChange={(event) =>
            setAssignment({ ...assignment, displayGrade: event.target.value })
          }
          className="w-full flex-1 rounded border border-neutral-300 bg-white px-3 py-2"
        >
          <option value="PERCENTAGE">Percentage</option>
          <option value="POINTS">Points</option>
          <option value="LETTER">Letter Grade</option>
          <option value="COMPLETE">Complete/Incomplete</option>
        </select>
      </div>
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-4">
        <label
          htmlFor="wd-submission-type"
          className="font-medium sm:w-40 sm:pt-2 sm:text-right"
        >
          Submission Type
        </label>
        <div className="flex-1 rounded border border-neutral-300 p-3">
          <select
            id="wd-submission-type"
            value={assignment.submissionType}
            onChange={(event) =>
              setAssignment({
                ...assignment,
                submissionType: event.target.value,
              })
            }
            className="mb-3 w-full rounded border border-neutral-300 bg-white px-3 py-2"
          >
            <option value="ONLINE">Online</option>
            <option value="ON_PAPER">On Paper</option>
            <option value="NO_SUBMISSION">No Submission</option>
          </select>
          <div className="mb-2 font-medium">Online Entry Options</div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="wd-text-entry"
              checked={assignment.entryOptions.includes("TEXT_ENTRY")}
              onChange={(event) =>
                setAssignment({
                  ...assignment,
                  entryOptions: event.target.checked
                    ? [...assignment.entryOptions, "TEXT_ENTRY"]
                    : assignment.entryOptions.filter(
                        (option) => option !== "TEXT_ENTRY",
                      ),
                })
              }
            />
            <label htmlFor="wd-text-entry">Text Entry</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="wd-website-url"
              checked={assignment.entryOptions.includes("WEBSITE_URL")}
              onChange={(event) =>
                setAssignment({
                  ...assignment,
                  entryOptions: event.target.checked
                    ? [...assignment.entryOptions, "WEBSITE_URL"]
                    : assignment.entryOptions.filter(
                        (option) => option !== "WEBSITE_URL",
                      ),
                })
              }
            />
            <label htmlFor="wd-website-url">Website URL</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="wd-media-recordings"
              checked={assignment.entryOptions.includes("MEDIA_RECORDINGS")}
              onChange={(event) =>
                setAssignment({
                  ...assignment,
                  entryOptions: event.target.checked
                    ? [...assignment.entryOptions, "MEDIA_RECORDINGS"]
                    : assignment.entryOptions.filter(
                        (option) => option !== "MEDIA_RECORDINGS",
                      ),
                })
              }
            />
            <label htmlFor="wd-media-recordings">Media Recordings</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="wd-student-annotation"
              checked={assignment.entryOptions.includes("STUDENT_ANNOTATION")}
              onChange={(event) =>
                setAssignment({
                  ...assignment,
                  entryOptions: event.target.checked
                    ? [...assignment.entryOptions, "STUDENT_ANNOTATION"]
                    : assignment.entryOptions.filter(
                        (option) => option !== "STUDENT_ANNOTATION",
                      ),
                })
              }
            />
            <label htmlFor="wd-student-annotation">Student Annotation</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="wd-file-upload"
              checked={assignment.entryOptions.includes("FILE_UPLOADS")}
              onChange={(event) =>
                setAssignment({
                  ...assignment,
                  entryOptions: event.target.checked
                    ? [...assignment.entryOptions, "FILE_UPLOADS"]
                    : assignment.entryOptions.filter(
                        (option) => option !== "FILE_UPLOADS",
                      ),
                })
              }
            />
            <label htmlFor="wd-file-upload">File Uploads</label>
          </div>
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-4">
        <span className="font-medium sm:w-40 sm:pt-3 sm:text-right">
          Assign
        </span>
        <div className="flex-1 rounded border border-neutral-300 p-3">
          <label htmlFor="wd-assign-to" className="mb-1 block font-medium">
            Assign to
          </label>
          <input
            id="wd-assign-to"
            value={assignment.assignTo}
            onChange={(event) =>
              setAssignment({ ...assignment, assignTo: event.target.value })
            }
            className="mb-3 w-full rounded border border-neutral-300 px-3 py-2"
          />
          <label htmlFor="wd-due-date" className="mb-1 block font-medium">
            Due
          </label>
          <input
            type="date"
            id="wd-due-date"
            value={assignment.due}
            onChange={(event) =>
              setAssignment({ ...assignment, due: event.target.value })
            }
            className="mb-3 w-full rounded border border-neutral-300 px-3 py-2"
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="wd-available-from"
                className="mb-1 block font-medium"
              >
                Available from
              </label>
              <input
                type="date"
                id="wd-available-from"
                value={assignment.available}
                onChange={(event) =>
                  setAssignment({
                    ...assignment,
                    available: event.target.value,
                  })
                }
                className="w-full rounded border border-neutral-300 px-3 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="wd-available-until"
                className="mb-1 block font-medium"
              >
                Until
              </label>
              <input
                type="date"
                id="wd-available-until"
                value={assignment.until}
                onChange={(event) =>
                  setAssignment({ ...assignment, until: event.target.value })
                }
                className="w-full rounded border border-neutral-300 px-3 py-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="wd-ai-editor-notes" className="mb-1 block font-medium">
          Sample notes
        </label>
        <textarea
          id="wd-ai-editor-notes"
          value={assignment.notes}
          onChange={(event) =>
            setAssignment({ ...assignment, notes: event.target.value })
          }
          rows={3}
          className="w-full rounded border border-neutral-300 px-3 py-2"
        />
      </div>
      <hr className="mb-4" />
      <div className="flex justify-end gap-2">
        <Link
          href={`/courses/${cid}/assignments`}
          id="wd-cancel"
          className="rounded border border-neutral-300 bg-neutral-100 px-4 py-2 text-neutral-900 no-underline"
        >
          Cancel
        </Link>
        <button
          type="submit"
          id="wd-save"
          className="rounded bg-red-600 px-4 py-2 text-white no-underline"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const assignment = useAssignmentsStore((state) =>
    state.assignments.find((row) => row._id === aid && row.course === cid),
  );
  if (aid !== "new" && !assignment) notFound();
  return (
    <AssignmentForm
      key={`${cid}/${aid}`}
      initial={assignment ?? { ...emptyAssignment, course: cid }}
      cid={cid}
      aid={aid}
    />
  );
}
