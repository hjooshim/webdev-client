import { create } from "zustand";
import { emptyProfile, type Profile } from "../profile/profile";
export const useProfileStore = create<{
  profile: Profile;
  setProfile: (profile: Profile) => void;
}>((set) => ({
  profile: emptyProfile,
  setProfile: (profile) => set({ profile }),
}));
