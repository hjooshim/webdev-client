"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { hasStatus, httpError } from "@/app/http";
import { profile } from "../client";
import type { User } from "../store/types";

export const emptyUser: User & { password: string } = {
  _id: "",
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
  role: "STUDENT",
  loginId: "",
  section: "",
  lastActivity: "",
  totalActivity: "",
  dob: "",
};

type AccountState = {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
};

const AccountContext = createContext<AccountState | null>(null);

export function AccountProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    profile(controller.signal)
      .then((user) => {
        if (!controller.signal.aborted) setCurrentUser(user);
      })
      .catch((requestError) => {
        if (!controller.signal.aborted && !hasStatus(requestError, 401)) {
          setError(httpError(requestError));
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setReady(true);
      });
    return () => controller.abort();
  }, []);

  if (!ready) return <p role="status" className="p-3">Loading Kambaz…</p>;

  return (
    <AccountContext.Provider value={{ currentUser, setCurrentUser }}>
      {error && <p role="alert" className="p-3 text-red-700">{error}</p>}
      {children}
    </AccountContext.Provider>
  );
}

export function useAccountContext() {
  const context = useContext(AccountContext);
  if (!context) throw new Error("AccountProvider is required");
  return context;
}
