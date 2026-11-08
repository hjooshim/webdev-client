"use client";
import useProfileForm from "./useProfileForm";
import ProfileFields from "../profile/ProfileFields";
import ProfileAlert from "../profile/ProfileAlert";
export default function HookProfileForm() {
  const { profile, setProfile, errors, submitted, save } = useProfileForm();
  return (
    <form id="wd-hook-profile-form" onSubmit={save} noValidate>
      <h3>useProfileForm</h3>
      <ProfileAlert
        id="wd-hook-profile-alert"
        submitted={submitted}
        errors={errors}
      />
      <ProfileFields
        prefix="wd-hook-profile"
        profile={profile}
        errors={errors}
        setProfile={setProfile}
      />
      <button
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-hook-profile-save"
        type="submit"
      >
        Save
      </button>
    </form>
  );
}
