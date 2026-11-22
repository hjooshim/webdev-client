"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAccountContext } from "../AccountContext";
import { signout, updateUser } from "../../client";
import { useRequest } from "@/app/useRequest";
import type { User } from "../../store/types";

function ProfileForm({ user }: { user: User }) {
  const [profile, setProfile] = useState({ ...user, password: "" });
  const [saved, setSaved] = useState(false);
  const { setCurrentUser } = useAccountContext();
  const { run, pending, error } = useRequest();
  const router = useRouter();
  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void run(async () => {
      const { password, ...details } = profile;
      const updated = await updateUser({ ...details, ...(password && { password }) });
      setCurrentUser(updated);
      setProfile({ ...updated, password: "" });
      setSaved(true);
    });
  };
  const fields = [
    { key: "username", label: "Username", id: "wd-username", type: "text" },
    { key: "password", label: "Password", id: "wd-password", type: "password" },
    { key: "firstName", label: "First Name", id: "wd-firstname", type: "text" },
    { key: "lastName", label: "Last Name", id: "wd-lastname", type: "text" },
    { key: "dob", label: "Date of birth", id: "wd-dob", type: "date" },
    { key: "email", label: "Email", id: "wd-email", type: "email" },
  ] as const;

  return (
    <form id="wd-profile-screen" onSubmit={save} className="max-w-sm">
      <h1 className="mb-3 text-2xl font-semibold">Profile</h1>
      {fields.map(({ key, label, id, type }) => (
        <div key={key}>
          <label htmlFor={id} className="mb-1 block">
            {label}
          </label>
          <input
            id={id}
            placeholder={label}
            type={type}
            value={profile[key] ?? ""}
            onChange={(event) => {
              setProfile({ ...profile, [key]: event.target.value });
              setSaved(false);
            }}
            className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
          />
        </div>
      ))}
      <label htmlFor="wd-role" className="mb-1 block">
        Role
      </label>
      <select
        id="wd-role"
        disabled
        value={profile.role}
        className="mb-3 w-full rounded border border-neutral-300 bg-white px-3 py-2"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
        <option value="TA">Teaching assistant</option>
      </select>
      {error && <p role="alert" className="mb-2 text-red-700">{error}</p>}
      {saved && (
        <p role="status" className="mb-2 text-green-700">
          Profile updated.
        </p>
      )}
      <button
        type="submit"
        id="wd-update-profile"
        disabled={pending}
        className="mb-2 block w-full rounded bg-blue-600 px-3 py-2 text-white"
      >
        Update
      </button>
      <button
        type="button"
        id="wd-signout-btn"
        disabled={pending}
        onClick={() => void run(async () => {
          await signout();
          setCurrentUser(null);
          router.push("/account/signin");
        })}
        className="block w-full rounded bg-red-600 px-3 py-2 text-white"
      >
        Sign out
      </button>
    </form>
  );
}

export default function Profile() {
  const { currentUser } = useAccountContext();
  const router = useRouter();
  useEffect(() => {
    if (!currentUser) router.replace("/account/signin");
  }, [currentUser, router]);
  return currentUser ? (
    <ProfileForm key={currentUser._id} user={currentUser} />
  ) : null;
}
