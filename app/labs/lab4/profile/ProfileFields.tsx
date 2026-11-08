import {
  dateToHtml,
  htmlToDate,
  TOPICS,
  type Profile,
  type ProfileErrors,
  type Role,
} from "./profile";
export default function ProfileFields({
  prefix,
  profile,
  errors,
  setProfile,
}: {
  prefix: string;
  profile: Profile;
  errors: ProfileErrors;
  setProfile: (profile: Profile) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`${prefix}-first-name`}>First name</label>
      <input
        className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
        id={`${prefix}-first-name`}
        value={profile.firstName}
        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
      />
      {errors.firstName && <p>{errors.firstName}</p>}
      <label htmlFor={`${prefix}-last-name`}>Last name</label>
      <input
        className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
        id={`${prefix}-last-name`}
        value={profile.lastName}
        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
      />
      {errors.lastName && <p>{errors.lastName}</p>}
      <label htmlFor={`${prefix}-password`}>Password</label>
      <input
        className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
        id={`${prefix}-password`}
        type="password"
        value={profile.password}
        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
      />
      {errors.password && <p>{errors.password}</p>}
      <label htmlFor={`${prefix}-dob`}>Date of birth</label>
      <input
        className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
        id={`${prefix}-dob`}
        type="date"
        value={dateToHtml(profile.dob)}
        onChange={(e) =>
          setProfile({ ...profile, dob: htmlToDate(e.target.value) })
        }
      />
      {errors.dob && <p>{errors.dob}</p>}
      <label htmlFor={`${prefix}-role`}>Role</label>
      <select
        className="rounded border border-neutral-300 px-3 py-1.5"
        id={`${prefix}-role`}
        value={profile.role}
        onChange={(e) =>
          setProfile({ ...profile, role: e.target.value as Role })
        }
      >
        <option value="">Choose a role</option>
        <option value="STUDENT">Student</option>
        <option value="TA">Teaching assistant</option>
        <option value="FACULTY">Faculty</option>
      </select>
      {errors.role && <p>{errors.role}</p>}
      <label>
        <input
          className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
          id={`${prefix}-newsletter`}
          type="checkbox"
          checked={profile.newsletter}
          onChange={() =>
            setProfile({ ...profile, newsletter: !profile.newsletter })
          }
        />{" "}
        Email me the newsletter
      </label>
      <fieldset id={`${prefix}-topics`}>
        <legend>Topics</legend>
        {TOPICS.map((topic) => (
          <label key={topic}>
            <input
              className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
              type="checkbox"
              checked={profile.topics.includes(topic)}
              onChange={() =>
                setProfile({
                  ...profile,
                  topics: profile.topics.includes(topic)
                    ? profile.topics.filter((t) => t !== topic)
                    : [...profile.topics, topic],
                })
              }
            />
            {topic}
          </label>
        ))}
      </fieldset>
      {errors.topics && <p>{errors.topics}</p>}
      <fieldset id={`${prefix}-theme`}>
        <legend>Theme</legend>
        <label>
          <input
            className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
            type="radio"
            name={`${prefix}-theme`}
            checked={profile.theme === "light"}
            onChange={() => setProfile({ ...profile, theme: "light" })}
          />
          Light
        </label>
        <label>
          <input
            className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
            type="radio"
            name={`${prefix}-theme`}
            checked={profile.theme === "dark"}
            onChange={() => setProfile({ ...profile, theme: "dark" })}
          />
          Dark
        </label>
      </fieldset>
    </div>
  );
}
