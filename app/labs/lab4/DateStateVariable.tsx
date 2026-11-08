"use client";
import { useState } from "react";
import { dateToHtml, htmlToDate } from "./profile/profile";
export default function DateStateVariable() {
  const [startDate, setStartDate] = useState(new Date(2026, 0, 15, 10, 30));
  const [endDate, setEndDate] = useState(new Date(2026, 1, 15));
  const [dueDate, setDueDate] = useState(new Date(2026, 0, 22, 10, 30));
  return (
    <section
      className="rounded border border-neutral-200 bg-white p-4 shadow-sm"
      id="wd-date-state-variables"
    >
      <h2>Date State Variables</h2>
      <h3>{startDate.toDateString()}</h3>
      <h3>{dateToHtml(startDate)}</h3>
      <input
        className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
        id="wd-start-date"
        type="date"
        value={dateToHtml(startDate)}
        onChange={(e) => setStartDate(htmlToDate(e.target.value) ?? startDate)}
      />
      <h3>End: {dateToHtml(endDate)}</h3>
      <input
        className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
        id="wd-end-date"
        type="date"
        value={dateToHtml(endDate)}
        onChange={(e) => setEndDate(htmlToDate(e.target.value) ?? endDate)}
      />
      <h3>Due: {dateToHtml(dueDate)}</h3>
      <input
        className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
        id="wd-due-date"
        type="date"
        value={dateToHtml(dueDate)}
        onChange={(e) => setDueDate(htmlToDate(e.target.value) ?? dueDate)}
      />
    </section>
  );
}
