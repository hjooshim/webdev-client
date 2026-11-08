"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { emptyUser, useAccountContext } from "../AccountContext";
import { useUsersStore } from "../../store/usersStore";
import { isValidUsername } from "./username";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");
  const { setCurrentUser } = useAccountContext();
  const { users, addUser } = useUsersStore();
  const router = useRouter();
  const signup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedUsername = username.trim();
    if (!isValidUsername(normalizedUsername)) {
      setError("Username is required.");
      return;
    }
    if (password !== verifyPassword) {
      setError("Passwords must match.");
      return;
    }
    if (users.some((user) => user.username === normalizedUsername)) {
      setError("That username is already in use.");
      return;
    }
    setCurrentUser(
      addUser({ ...emptyUser, username: normalizedUsername, password }),
    );
    router.push("/account/profile");
  };
  const fieldClass = "mb-2 w-full rounded border border-neutral-300 px-3 py-2";

  return (
    <form id="wd-signup-screen" onSubmit={signup} className="max-w-sm">
      <h1 className="mb-3 text-2xl font-semibold">Sign up</h1>
      <label htmlFor="wd-username" className="mb-1 block">
        Username
      </label>
      <input
        id="wd-username"
        placeholder="username"
        autoComplete="username"
        required
        pattern=".*\S.*"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        className={`wd-username ${fieldClass}`}
      />
      <label htmlFor="wd-password" className="mb-1 block">
        Password
      </label>
      <input
        id="wd-password"
        placeholder="password"
        type="password"
        autoComplete="new-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className={`wd-password ${fieldClass}`}
      />
      <label htmlFor="wd-verify-password" className="mb-1 block">
        Verify password
      </label>
      <input
        id="wd-verify-password"
        placeholder="verify password"
        type="password"
        autoComplete="new-password"
        required
        value={verifyPassword}
        onChange={(event) => setVerifyPassword(event.target.value)}
        className={`wd-password-verify ${fieldClass}`}
      />
      {error && (
        <p role="alert" className="mb-2 text-red-700">
          {error}
        </p>
      )}
      <button
        type="submit"
        id="wd-signup-btn"
        className="mb-2 block w-full rounded bg-blue-600 px-3 py-2 text-white"
      >
        Sign up
      </button>
      <Link href="/account/signin">Sign in</Link>
    </form>
  );
}
