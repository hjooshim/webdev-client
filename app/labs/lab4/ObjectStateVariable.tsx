"use client";
import { useState } from "react";
export default function ObjectStateVariable() {
  const [person, setPerson] = useState({
    name: "Peter",
    age: 24,
    city: "Boston",
  });
  return (
    <section
      className="rounded border border-neutral-200 bg-white p-4 shadow-sm"
      id="wd-object-state-variables"
    >
      <h2>Object State Variables</h2>
      <pre>{JSON.stringify(person, null, 2)}</pre>
      <input
        className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
        id="wd-person-name"
        value={person.name}
        onChange={(e) => setPerson({ ...person, name: e.target.value })}
      />
      <input
        className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
        id="wd-person-age"
        type="number"
        value={person.age}
        onChange={(e) => setPerson({ ...person, age: Number(e.target.value) })}
      />
      <label>
        My city
        <input
          className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
          id="wd-person-personal-city"
          value={person.city}
          onChange={(e) => setPerson({ ...person, city: e.target.value })}
        />
      </label>
      <label>
        Sample city
        <input
          className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
          id="wd-person-city"
          value={person.city}
          onChange={(e) => setPerson({ ...person, city: e.target.value })}
        />
      </label>
    </section>
  );
}
