"use client";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { User } from "../store/types";

export const emptyUser: User = {
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
  return (
    <AccountContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccountContext() {
  const context = useContext(AccountContext);
  if (!context) throw new Error("AccountProvider is required");
  return context;
}
