import { create } from "zustand";
import seed from "../database/users.json";
import type { User } from "./types";

type UsersState = {
  users: User[];
  addUser: (user: User) => User;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
};

export const useUsersStore = create<UsersState>((set) => ({
  users: seed,
  addUser: (user) => {
    const added = { ...user, _id: crypto.randomUUID() };
    set((state) => ({ users: [...state.users, added] }));
    return added;
  },
  updateUser: (user) =>
    set((state) => ({
      users: state.users.map((row) =>
        row._id === user._id ? { ...user } : row,
      ),
    })),
  deleteUser: (id) =>
    set((state) => ({ users: state.users.filter((row) => row._id !== id) })),
}));
