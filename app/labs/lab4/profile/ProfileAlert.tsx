import type { ProfileErrors } from "./profile";
export default function ProfileAlert({
  id,
  submitted,
  errors,
}: {
  id: string;
  submitted: boolean;
  errors: ProfileErrors;
}) {
  if (!submitted) return null;
  const count = Object.keys(errors).length;
  return count ? (
    <div id={id} role="alert" className="rounded bg-red-100 p-2 text-red-800">
      Please fix {count} {count === 1 ? "field" : "fields"} below.
    </div>
  ) : (
    <div
      id={id}
      role="status"
      className="rounded bg-green-100 p-2 text-green-800"
    >
      Profile saved.
    </div>
  );
}
