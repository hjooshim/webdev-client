import assert from "node:assert/strict";
import { test } from "node:test";

const baseUrl = process.env.A3_BASE_URL ?? "http://localhost:3000";

function textOf(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[^]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

async function page(path) {
  const response = await fetch(new URL(path, baseUrl));
  assert.equal(response.status, 200, `${path} should load`);
  const html = await response.text();
  return { html, text: textOf(html) };
}

test("Lab 3 renders personal and AI exercises alongside the worked examples", async () => {
  const { html, text } = await page("/labs/lab3");
  assert.ok([...html.matchAll(/<h[2-5]\b/g)].length >= 20);
  for (const expected of [
    "not false1", "Good morning", "Guest Inline", "Admin Inline",
    "Pathname length: 10", "Last segment: lab3", "Server Information",
    "Dynamic Green background", "Gray background", "Children can be any JSX",
    "Email the TA", "Alice, Bob", "Hyunjoo Shim",
  ]) {
    assert.ok(text.includes(expected), `Lab 3 should display ${expected}`);
  }
  assert.ok([...html.matchAll(/type="checkbox"/g)].length >= 5);
  assert.match(html, /href="\/labs\/lab3\/add\/5\/6"/);
  assert.match(text, /garage\?\.cars\s*\?\?\s*0\s*=\s*0/);
});

test("addition URLs compute unseen integer, decimal and negative operands", async () => {
  for (const [a, b, sum] of [[12, 30, 42], [-7, 2.5, -4.5], [0, 0, 0], [5, 6, 11]]) {
    const { text } = await page(`/labs/lab3/add/${a}/${b}`);
    assert.ok(text.includes(`${a} + ${b} = ${sum}`), `Expected ${a} + ${b} = ${sum}`);
  }
});

test("Labs navigation marks the current lab and keeps the chapter link external", async () => {
  for (const lab of ["lab1", "lab3"]) {
    const { html } = await page(`/labs/${lab}`);
    const currentLinks = [...html.matchAll(/<a\b[^>]*aria-current="page"[^>]*>/g)]
      .filter(([tag]) => /id="wd-toc-lab/.test(tag));
    assert.equal(currentLinks.length, 1);
    assert.ok(currentLinks[0][0].includes(`href="/labs/${lab}"`));
    assert.match(html, /href="https:\/\/kambaz.dev\/book\/ch3"/);
  }
});

test("Dashboard cards encode database course IDs", async () => {
  const { html, text } = await page("/dashboard");
  for (const id of ["RS101", "RS102", "RS103", "RS104"]) {
    assert.ok(html.includes(`href="/courses/${id}/home"`));
  }
  assert.ok(text.includes("Organic Chemistry"));
  assert.ok(text.includes("Spacecraft Systems Design"));
});

test("different course URLs select different headings and preserve navigation IDs", async () => {
  for (const [id, name] of [["RS101", "Rocket Propulsion"], ["RS102", "Aerodynamics"]]) {
    const { html, text } = await page(`/courses/${id}/home`);
    assert.ok(text.includes(name));
    for (const segment of ["home", "modules", "assignments", "people/table", "announcements"]) {
      assert.ok(html.includes(`href="/courses/${id}/${segment}"`));
    }
  }
});

test("modules and added lessons are scoped to their owning course", async () => {
  const rocket = await page("/courses/RS101/modules");
  const aero = await page("/courses/RS102/modules");
  for (const title of ["Introduction to Rocket Propulsion", "Mission Planning", "Nozzle Design"]) {
    assert.ok(rocket.text.includes(title));
    assert.ok(!aero.text.includes(title));
  }
  assert.ok(aero.text.includes("Fundamentals of Aerodynamics"));
});

test("assignment lists and editor defaults follow both course and assignment IDs", async () => {
  for (const [id, own, other] of [["RS101", "A101", "A201"], ["RS102", "A201", "A101"]]) {
    const { html } = await page(`/courses/${id}/assignments`);
    assert.ok(html.includes(`href="/courses/${id}/assignments/${own}"`));
    assert.ok(!html.includes(`/assignments/${other}`));
  }
  const first = await page("/courses/RS101/assignments/A101");
  const second = await page("/courses/RS101/assignments/A102");
  assert.match(first.html, /<input(?=[^>]*\bid="wd-name")(?=[^>]*\bvalue="A1")[^>]*>/);
  assert.match(second.html, /<input(?=[^>]*\bid="wd-name")(?=[^>]*\bvalue="A2")[^>]*>/);
  assert.ok(first.text.includes("thermodynamics"));
  assert.ok(second.text.includes("hybrid rocket"));
  const extra = await page("/courses/RS102/assignments/A204");
  assert.match(extra.html, /<input(?=[^>]*\bid="wd-name")(?=[^>]*\bvalue="A4")[^>]*>/);
  assert.ok(extra.text.includes("Assignment id: A204"));
});

test("rosters follow enrollments including the personal and AI additions", async () => {
  const rocket = await page("/courses/RS101/people/table");
  const aero = await page("/courses/RS102/people/table");
  for (const name of ["Steve Rogers", "Thor Odinson"]) {
    assert.ok(rocket.text.includes(name));
    assert.ok(aero.text.includes(name));
  }
  assert.ok(rocket.text.includes("Natasha Romanoff"));
  assert.ok(!aero.text.includes("Natasha Romanoff"));
  assert.ok(aero.text.includes("Pepper Potts"));
  assert.ok(!rocket.text.includes("Pepper Potts"));
  assert.ok(aero.text.includes("People"));
});
