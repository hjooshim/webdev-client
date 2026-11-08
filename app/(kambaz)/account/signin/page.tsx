"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAccountContext } from "../AccountContext";
import { useUsersStore } from "../../store/usersStore";

export default function Signin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { setCurrentUser } = useAccountContext();
  const users = useUsersStore((state) => state.users);
  const router = useRouter();
  const signin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = users.find(
      (row) =>
        row.username === credentials.username &&
        row.password === credentials.password,
    );
    if (!user) {
      setError("Username or password is incorrect.");
      return;
    }
    setCurrentUser(user);
    router.push("/dashboard");
  };

  return (
    <form id="wd-signin-screen" onSubmit={signin} className="max-w-sm">
      <h1 className="mb-3 text-2xl font-semibold">Sign in</h1>
      <label htmlFor="wd-username" className="mb-1 block">
        Username
      </label>
      <input
        id="wd-username"
        placeholder="username"
        autoComplete="username"
        required
        value={credentials.username}
        onChange={(event) =>
          setCredentials({ ...credentials, username: event.target.value })
        }
        className="wd-username mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      <label htmlFor="wd-password" className="mb-1 block">
        Password
      </label>
      <input
        id="wd-password"
        placeholder="password"
        autoComplete="current-password"
        required
        type="password"
        value={credentials.password}
        onChange={(event) =>
          setCredentials({ ...credentials, password: event.target.value })
        }
        className="wd-password mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      <label htmlFor="wd-ai-signin-note" className="mb-1 block text-sm">
        Sample note
      </label>
      <input
        id="wd-ai-signin-note"
        placeholder="sample note"
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      {error && (
        <p role="alert" className="mb-2 text-red-700">
          {error}
        </p>
      )}
      <button
        id="wd-signin-btn"
        type="submit"
        className="mb-2 block w-full rounded bg-blue-600 px-3 py-2 text-white"
      >
        Sign in
      </button>
      <Link id="wd-signup-link" href="/account/signup">
        Sign up
      </Link>
    </form>
  );
}
