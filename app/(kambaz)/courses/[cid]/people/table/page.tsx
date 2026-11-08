"use client";

import { useState, type FormEvent } from "react";
import { useParams } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import {
  emptyUser,
  useAccountContext,
} from "../../../../account/AccountContext";
import { useUsersStore } from "../../../../store/usersStore";
import { useEnrollmentsStore } from "../../../../store/enrollmentsStore";

export default function PeopleTable() {
  const { cid } = useParams<{ cid: string }>();
  const { users, addUser, updateUser } = useUsersStore();
  const { enrollments, enroll, unenroll } = useEnrollmentsStore();
  const { currentUser, setCurrentUser } = useAccountContext();
  const [draft, setDraft] = useState({ ...emptyUser });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const enrolled = users.filter((user) =>
    enrollments.some((row) => row.user === user._id && row.course === cid),
  );
  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.username.trim() || !draft.firstName.trim()) return;
    const existing = users.find(
      (user) =>
        user.username === draft.username.trim() && user._id !== draft._id,
    );
    if (existing) {
      setError("That username is already in use.");
      return;
    }
    if (draft._id) {
      updateUser(draft);
      if (currentUser?._id === draft._id) setCurrentUser({ ...draft });
    } else {
      const added = addUser({ ...draft, username: draft.username.trim() });
      enroll(added._id, cid);
    }
    setDraft({ ...emptyUser });
    setShowForm(false);
    setError("");
  };
  const fields = [
    { key: "firstName", label: "First name" },
    { key: "lastName", label: "Last name" },
    { key: "username", label: "Username" },
    { key: "password", label: "Password" },
    { key: "email", label: "Email" },
    { key: "loginId", label: "Login ID" },
    { key: "section", label: "Section" },
  ] as const;

  return (
    <div id="wd-people-table" className="overflow-x-auto">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold">People</h2>
        <button
          type="button"
          onClick={() => {
            setDraft({ ...emptyUser });
            setShowForm(true);
            setError("");
          }}
          className="rounded bg-red-600 px-3 py-2 text-white"
        >
          + People
        </button>
      </div>
      {showForm && (
        <form
          onSubmit={save}
          className="mb-4 max-w-2xl rounded border border-neutral-300 p-4"
        >
          <h3 className="mb-3 text-lg font-semibold">
            {draft._id ? "Edit person" : "Add person"}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {fields.map(({ key, label }) => (
              <div key={key}>
                <label htmlFor={`wd-person-${key}`} className="mb-1 block">
                  {label}
                </label>
                <input
                  id={`wd-person-${key}`}
                  required={key === "username" || key === "firstName"}
                  type={
                    key === "password"
                      ? "password"
                      : key === "email"
                        ? "email"
                        : "text"
                  }
                  value={draft[key]}
                  onChange={(event) =>
                    setDraft({ ...draft, [key]: event.target.value })
                  }
                  className="w-full rounded border border-neutral-300 px-3 py-2"
                />
              </div>
            ))}
            <div>
              <label htmlFor="wd-person-role" className="mb-1 block">
                Role
              </label>
              <select
                id="wd-person-role"
                value={draft.role}
                onChange={(event) =>
                  setDraft({ ...draft, role: event.target.value })
                }
                className="w-full rounded border px-3 py-2"
              >
                <option value="STUDENT">Student</option>
                <option value="TA">Teaching assistant</option>
                <option value="FACULTY">Faculty</option>
                <option value="ADMIN">Admin</option>
                <option value="USER">User</option>
              </select>
            </div>
          </div>
          {error && (
            <p role="alert" className="my-2 text-red-700">
              {error}
            </p>
          )}
          <div className="mt-3 flex gap-2">
            <button
              type="submit"
              className="rounded bg-blue-600 px-3 py-2 text-white"
            >
              Save person
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded border px-3 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-300">
            <th className="p-2">Name</th>
            <th className="p-2">Login ID</th>
            <th className="p-2">Section</th>
            <th className="p-2">Role</th>
            <th className="p-2">Last Activity</th>
            <th className="p-2">Total Activity</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {enrolled.map((user) => (
            <tr key={user._id} className="odd:bg-neutral-50">
              <td className="wd-full-name p-2 text-nowrap">
                <FaUserCircle className="me-2 inline align-middle text-4xl text-neutral-500" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id p-2">{user.loginId}</td>
              <td className="wd-section p-2">{user.section}</td>
              <td className="wd-role p-2">{user.role}</td>
              <td className="wd-last-activity p-2">{user.lastActivity}</td>
              <td className="wd-total-activity p-2">{user.totalActivity}</td>
              <td className="p-2">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setDraft({ ...user });
                      setShowForm(true);
                      setError("");
                    }}
                    className="rounded border px-2 py-1"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    aria-label={`Remove ${user.firstName} ${user.lastName} from course`}
                    onClick={() => unenroll(user._id, cid)}
                    className="rounded bg-red-600 px-2 py-1 text-white"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
