import assert from "node:assert/strict";
import { test } from "node:test";

const baseUrl = process.env.A4_BASE_URL ?? "http://localhost:3000";

async function page(path) {
  const response = await fetch(new URL(path, baseUrl));
  assert.equal(response.status, 200, `${path} should load`);
  const html = await response.text();
  const text = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[^]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
  return { html, text };
}

test("Lab 4 exposes all state approaches and its exercise navigation", async () => {
  const { html, text } = await page("/labs/lab4");
  assert.ok([...html.matchAll(/<h[1-6]\b/g)].length >= 15);
  assert.ok([...html.matchAll(/<button\b/g)].length >= 15);
  for (const topic of ["Zustand", "Redux", "Context", "Hyunjoo Shim"])
    assert.ok(text.includes(topic), topic);
  assert.ok([...html.matchAll(/type="date"/g)].length >= 2);
  assert.ok([...html.matchAll(/type="checkbox"/g)].length >= 3);
  assert.ok(html.includes("/labs/lab4/hooks"));
  assert.ok(html.includes("/labs/lab4/url-encoding/query-params?"));
  assert.ok(html.includes("/labs/lab4/url-encoding/path-params/"));
});

test("two and three operand path routes calculate arbitrary signed decimal values", async () => {
  for (const [path, expected] of [
    ["12/30", 42],
    ["-7/2.5", -4.5],
    ["0/0", 0],
    ["5/10/3", 18],
    ["-5/2.5/1", -1.5],
  ]) {
    const { text } = await page(`/labs/lab4/url-encoding/path-params/${path}`);
    assert.ok(
      text.includes(`Sum = ${expected}`),
      `${path} should show ${expected}`,
    );
  }
});

test("guest Dashboard renders editable seed courses and all required form fields", async () => {
  const { html, text } = await page("/dashboard");
  assert.ok(text.includes("Rocket Propulsion"));
  assert.ok(text.includes("Aerodynamics"));
  assert.ok([...html.matchAll(/wd-dashboard-course-title/g)].length >= 3);
  for (const id of [
    "wd-course-name",
    "wd-course-description",
    "wd-course-number",
    "wd-course-start-date",
  ])
    assert.ok(html.includes(`id="${id}"`));
  assert.ok(text.includes("Edit"));
  assert.ok(text.includes("Delete"));
});

test("guest Modules screens retain course-specific data and edit/delete controls", async () => {
  const rocket = await page("/courses/RS101/modules");
  const aero = await page("/courses/RS102/modules");
  assert.ok(rocket.text.includes("Introduction to Rocket Propulsion"));
  assert.ok(!aero.text.includes("Introduction to Rocket Propulsion"));
  assert.ok(aero.text.includes("Fundamentals of Aerodynamics"));
  for (const { html, text } of [rocket, aero]) {
    assert.ok(text.includes("+ Module"));
    assert.ok(html.includes('aria-label="Edit module"'));
    assert.ok(html.includes('aria-label="Delete module"'));
  }
});

test("signed-out account navigation conceals Profile and Profile renders no user details", async () => {
  const signin = await page("/account/signin");
  assert.ok(signin.html.includes('type="password"'));
  assert.ok(signin.html.includes('id="wd-signin-btn"'));
  const nav =
    signin.html.match(/id="wd-account-navigation"[^]*?<\/div>/)?.[0] ?? "";
  assert.ok(nav.includes("/account/signin"));
  assert.ok(nav.includes("/account/signup"));
  assert.ok(!nav.includes("/account/profile"));
  const profile = await page("/account/profile");
  assert.ok(!profile.html.includes('id="wd-profile-screen"'));
  assert.ok(!profile.text.includes("Tony Stark"));
});

test("assignment editors scope seed rows and support creating a new draft", async () => {
  const first = await page("/courses/RS101/assignments/A101");
  const second = await page("/courses/RS101/assignments/A102");
  assert.match(
    first.html,
    /<input(?=[^>]*\bid="wd-name")(?=[^>]*\bvalue="A1")[^>]*>/,
  );
  assert.match(
    second.html,
    /<input(?=[^>]*\bid="wd-name")(?=[^>]*\bvalue="A2")[^>]*>/,
  );
  const fresh = await page("/courses/RS101/assignments/new");
  assert.ok(fresh.html.includes('id="wd-save"'));
  assert.ok(fresh.html.includes('id="wd-cancel"'));
  const list = await page("/courses/RS102/assignments");
  assert.ok(!list.html.includes("/assignments/A101"));
});

test("custom hooks and profile-form pages remain reachable", async () => {
  const hooks = await page("/labs/lab4/hooks");
  for (const topic of [
    "useWindowSize",
    "useToggle",
    "useLocalStorage",
    "useProfileForm",
  ])
    assert.ok(hooks.text.includes(topic), topic);
  const profile = await page("/labs/lab4/profile-form");
  assert.ok(profile.text.includes("Save"));
});
