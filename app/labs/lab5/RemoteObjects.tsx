"use client";

import { useEffect, useState, type FormEvent } from "react";
import { HTTP_SERVER, httpError } from "@/app/http";
import { useRequest } from "@/app/useRequest";
import { fetchAssignment, updateAssignmentTitle, type Assignment } from "./client";
import { buttonClass, inputClass, LabLink } from "./LabLink";

export function AssignmentLinks() {
  const [title, setTitle] = useState("HTTP APIs");
  const [score, setScore] = useState("100");
  const [completed, setCompleted] = useState(false);
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-3">
        <LabLink id="wd-retrieve-assignments" path="/assignment">Get Assignment</LabLink>
        <LabLink id="wd-retrieve-assignment-title" path="/assignment/title">Get Assignment Title</LabLink>
      </div>
      <h4>Editing the Assignment Object</h4>
      <div className="flex flex-wrap items-center gap-2">
        <label>Title <input value={title} onChange={(event) => setTitle(event.target.value)} className={inputClass} /></label>
        <LabLink id="wd-update-assignment-title" path={title.trim() ? `/assignment/title/${encodeURIComponent(title)}` : undefined}>Update Assignment Title</LabLink>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <label>Score <input type="number" value={score} onChange={(event) => setScore(event.target.value)} className={inputClass} /></label>
        <LabLink path={score ? `/assignment/score/${encodeURIComponent(score)}` : undefined}>Update Score</LabLink>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <label><input type="checkbox" checked={completed} onChange={(event) => setCompleted(event.target.checked)} /> Completed</label>
        <LabLink path={`/assignment/completed/${completed}`}>Update Completed</LabLink>
      </div>
    </div>
  );
}

export function ModuleLinks() {
  const [name, setName] = useState("Express Modules");
  const [description, setDescription] = useState("Learn to organize HTTP routes.");
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-3">
        <LabLink path="/module">Get Module</LabLink>
        <LabLink path="/module/name">Get Module Name</LabLink>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <label>Module name <input value={name} onChange={(event) => setName(event.target.value)} className={inputClass} /></label>
        <LabLink path={name.trim() ? `/module/name/${encodeURIComponent(name)}` : undefined}>Update Module Name</LabLink>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <label>Description <input value={description} onChange={(event) => setDescription(event.target.value)} className={inputClass} /></label>
        <LabLink path={description.trim() ? `/module/description/${encodeURIComponent(description)}` : undefined}>Update Module Description</LabLink>
      </div>
    </div>
  );
}

export function AsyncAssignment() {
  const [assignment, setAssignment] = useState<Assignment>();
  const [title, setTitle] = useState("");
  const [loadError, setLoadError] = useState("");
  const { run, pending, error } = useRequest();

  useEffect(() => {
    if (!HTTP_SERVER) return;
    const controller = new AbortController();
    fetchAssignment(controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return;
        setAssignment(data);
        setTitle(data.title);
      })
      .catch((requestError) => {
        if (!controller.signal.aborted) setLoadError(httpError(requestError));
      });
    return () => controller.abort();
  }, []);

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) return;
    void run(async () => {
      const updated = await updateAssignmentTitle(title);
      setAssignment(updated);
      setTitle(updated.title);
    });
  };

  return (
    <>
      <h4>Fetching an Assignment on Mount</h4>
      {assignment && <pre className="overflow-x-auto">{JSON.stringify(assignment, null, 2)}</pre>}
      {!assignment && HTTP_SERVER && !loadError && <p role="status">Loading assignment…</p>}
      <h4>Updating the Assignment Title</h4>
      <form onSubmit={save} className="flex flex-wrap gap-2">
        <label>Title <input required value={title} onChange={(event) => setTitle(event.target.value)} className={inputClass} /></label>
        <button type="submit" disabled={!assignment || pending} className={buttonClass}>Update Title</button>
      </form>
      {(loadError || error) && <p role="alert" className="text-red-700">{loadError || error}</p>}
    </>
  );
}
