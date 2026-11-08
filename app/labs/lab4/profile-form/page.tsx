import ProfileForm from "../profile/ProfileForm";
import ContextProfileForm from "../context/ContextProfileForm";
import ZustandProfileForm from "../zustand/ZustandProfileForm";
export default function ProfileFormsPage() {
  return (
    <div id="wd-profile-forms" className="flex flex-col gap-8 p-4">
      <h1>Profile forms</h1>
      <ProfileForm />
      <ContextProfileForm />
      <ZustandProfileForm />
    </div>
  );
}
