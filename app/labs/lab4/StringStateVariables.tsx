"use client";
import { useState } from "react";
export default function StringStateVariables() {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [nickName, setNickName] = useState("JD");
  return (
    <section
      className="rounded border border-neutral-200 bg-white p-4 shadow-sm"
      id="wd-string-state-variables"
    >
      <h2>String State Variables</h2>
      <p>
        {firstName} {lastName} ({nickName})
      </p>
      <input
        className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
        id="wd-first-name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
        id="wd-last-name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
        id="wd-nick-name"
        value={nickName}
        onChange={(e) => setNickName(e.target.value)}
      />
    </section>
  );
}
