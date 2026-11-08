"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAccountContext } from "../AccountContext";
import { useUsersStore } from "../../store/usersStore";
import type { User } from "../../store/types";

function ProfileForm({ user }: { user: User }) {
  const [profile, setProfile] = useState({ ...user });
  const [saved, setSaved] = useState(false);
  const { setCurrentUser } = useAccountContext();
  const updateUser = useUsersStore((state) => state.updateUser);
  const router = useRouter();
  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUser(profile);
    setCurrentUser({ ...profile });
    setSaved(true);
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
        value={profile.role}
        onChange={(event) =>
          setProfile({ ...profile, role: event.target.value })
        }
        className="mb-3 w-full rounded border border-neutral-300 bg-white px-3 py-2"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
        <option value="TA">Teaching assistant</option>
      </select>
      {saved && (
        <p role="status" className="mb-2 text-green-700">
          Profile updated.
        </p>
      )}
      <button
        type="submit"
        id="wd-update-profile"
        className="mb-2 block w-full rounded bg-blue-600 px-3 py-2 text-white"
      >
        Update
      </button>
      <button
        type="button"
        id="wd-signout-btn"
        onClick={() => {
          setCurrentUser(null);
          router.push("/account/signin");
        }}
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
