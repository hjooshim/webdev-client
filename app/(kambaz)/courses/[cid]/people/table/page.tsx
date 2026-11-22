"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useParams } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import {
  emptyUser,
  useAccountContext,
} from "../../../../account/AccountContext";
import { addPerson, findPeople, unenrollFromCourse, updateUser } from "../../../../client";
import type { User } from "../../../../store/types";
import { httpError } from "@/app/http";
import { useRequest } from "@/app/useRequest";

export default function PeopleTable() {
  const { cid } = useParams<{ cid: string }>();
  const { currentUser, setCurrentUser } = useAccountContext();
  const [people, setPeople] = useState<User[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [draft, setDraft] = useState({ ...emptyUser });
  const [showForm, setShowForm] = useState(false);
  const { run, pending, error } = useRequest();
  const canManage = !!currentUser && ["FACULTY", "ADMIN"].includes(currentUser.role);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    findPeople(cid, signal)
      .then((rows) => {
        if (signal.aborted) return;
        setPeople(rows);
        setLoaded(true);
      })
      .catch((requestError) => {
        if (!signal.aborted) setLoadError(httpError(requestError));
      });
    return () => controller.abort();
  }, [cid]);

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.username.trim() || !draft.firstName.trim()) return;
    void run(async () => {
      if (draft._id) {
        const updated = await updateUser(draft);
        setPeople((rows) => rows.map((row) => row._id === updated._id ? updated : row));
        if (currentUser?._id === updated._id) setCurrentUser(updated);
      } else {
        const person = await addPerson(cid, draft);
        setPeople((rows) => [...rows, person]);
      }
      setDraft({ ...emptyUser });
      setShowForm(false);
    });
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

  if (loadError) return <p role="alert" className="text-red-700">{loadError}</p>;
  if (!loaded) return <p role="status">Loading people…</p>;

  return (
    <div id="wd-people-table" className="overflow-x-auto">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold">People</h2>
        {canManage && <button
          type="button"
          onClick={() => {
            setDraft({ ...emptyUser });
            setShowForm(true);
          }}
          className="rounded bg-red-600 px-3 py-2 text-white"
        >
          + People
        </button>}
      </div>
      {error && <p role="alert" className="my-2 text-red-700">{error}</p>}
      {canManage && showForm && (
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
                  required={key === "username" || key === "firstName" || (key === "password" && !draft._id)}
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
          <div className="mt-3 flex gap-2">
            <button
              type="submit"
              disabled={pending}
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
            {canManage && <th className="p-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {people.map((user) => (
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
              {canManage && <td className="p-2">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setDraft({ ...user, password: "" });
                      setShowForm(true);
                              }}
                    className="rounded border px-2 py-1"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    aria-label={`Remove ${user.firstName} ${user.lastName} from course`}
                    disabled={pending}
                    onClick={() => void run(async () => {
                      await unenrollFromCourse(user._id, cid);
                      setPeople((rows) => rows.filter((row) => row._id !== user._id));
                    })}
                    className="rounded bg-red-600 px-2 py-1 text-white"
                  >
                    Delete
                  </button>
                </div>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
