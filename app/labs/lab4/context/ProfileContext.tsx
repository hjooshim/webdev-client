import { createContext, useContext, useState, type ReactNode } from "react";
import { emptyProfile, type Profile } from "../profile/profile";
const ProfileContext = createContext<{
  profile: Profile;
  setProfile: (profile: Profile) => void;
} | null>(null);
export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}
export function useProfileContext() {
  const value = useContext(ProfileContext);
  if (!value) throw new Error("ProfileProvider required");
  return value;
}
