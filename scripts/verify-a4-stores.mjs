import assert from "node:assert/strict";
import { test, beforeEach } from "node:test";
import fs from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";

const loadModule = createRequire(import.meta.url);

loadModule.extensions[".ts"] = (module, filename) => {
  const result = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: true,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: filename,
  });
  module._compile(result.outputText, filename);
};

const load = (name) => loadModule(`../app/(kambaz)/store/${name}.ts`);
let courses;
let modules;
let enrollments;
let users;

beforeEach(() => {
  courses = load("coursesStore").useCoursesStore;
  modules = load("modulesStore").useModulesStore;
  enrollments = load("enrollmentsStore").useEnrollmentsStore;
  users = load("usersStore").useUsersStore;
  for (const store of [courses, modules, enrollments, users])
    store.setState(store.getInitialState(), true);
});

test("courses create unique rows, preserve edits and remove only the selected course", () => {
  const original = courses.getState().courses;
  const draft = {
    ...original[0],
    _id: "",
    name: "HS Test",
    number: "HS100",
    startDate: "2026-11-08",
  };
  const added = courses.getState().addCourse(draft);
  assert.ok(added._id);
  assert.ok(!original.some((course) => course._id === added._id));
  courses.getState().updateCourse({ ...added, name: "Renamed" });
  assert.equal(
    courses.getState().courses.find((course) => course._id === added._id).name,
    "Renamed",
  );
  assert.deepEqual(
    courses.getState().courses.slice(0, original.length),
    original,
  );
  courses.getState().deleteCourse(added._id);
  assert.deepEqual(courses.getState().courses, original);
});

test("module mutations preserve lessons and stay in their owning course", () => {
  const original = modules.getState().modules;
  assert.equal(
    modules.getState().addModule({ name: "   ", course: "RS101" }),
    null,
  );
  const added = modules
    .getState()
    .addModule({ name: " HS module ", course: "RS101" });
  assert.equal(added.name, "HS module");
  assert.deepEqual(added.lessons, []);
  modules.getState().editModule(added._id);
  assert.equal(
    modules.getState().modules.find((row) => row._id === added._id).editing,
    true,
  );
  modules
    .getState()
    .updateModule({ ...added, name: "Renamed", editing: false });
  assert.equal(
    modules.getState().modules.filter((row) => row.course === "RS102").length,
    original.filter((row) => row.course === "RS102").length,
  );
  assert.deepEqual(modules.getState().modules[0].lessons, original[0].lessons);
  modules.getState().deleteModule(added._id);
  assert.deepEqual(modules.getState().modules, original);
});

test("enrollment is idempotent and unenrollment changes only the matching user and course", () => {
  const original = enrollments.getState().enrollments;
  enrollments.getState().enroll("new-user", "RS101");
  enrollments.getState().enroll("new-user", "RS101");
  enrollments.getState().enroll("new-user", "RS102");
  assert.equal(enrollments.getState().enrollments.length, original.length + 2);
  enrollments.getState().unenroll("new-user", "RS101");
  assert.ok(
    enrollments
      .getState()
      .enrollments.some(
        (row) => row.user === "new-user" && row.course === "RS102",
      ),
  );
  assert.deepEqual(
    enrollments.getState().enrollments.filter((row) => row.user !== "new-user"),
    original,
  );
});

test("new users and profile updates remain available to later sign-in during this session", () => {
  const original = users.getState().users;
  const added = users
    .getState()
    .addUser({ ...original[0], _id: "", username: "hs_test" });
  users.getState().updateUser({ ...added, firstName: "Hyunjoo" });
  assert.equal(
    users.getState().users.find((user) => user.username === "hs_test")
      .firstName,
    "Hyunjoo",
  );
  users.getState().deleteUser(added._id);
  assert.deepEqual(users.getState().users, original);
});

test("assignments save fields and reject changes through a different course", () => {
  const store = load("assignmentsStore").useAssignmentsStore;
  store.setState(store.getInitialState(), true);
  const original = store.getState().assignments;
  const added = store.getState().addAssignment({
    ...original[0],
    _id: "",
    title: "HS assignment",
    until: "2026-12-18",
  });
  assert.ok(added._id);
  store.getState().updateAssignment({ ...added, title: "Saved", points: 42 });
  assert.equal(
    store.getState().assignments.find((row) => row._id === added._id).points,
    42,
  );
  store
    .getState()
    .updateAssignment({ ...added, course: "RS102", title: "Wrong course" });
  assert.equal(
    store.getState().assignments.find((row) => row._id === added._id).title,
    "Saved",
  );
  store.getState().deleteAssignment(added._id, "RS102");
  assert.ok(store.getState().assignments.some((row) => row._id === added._id));
  store.getState().deleteAssignment(added._id, added.course);
  assert.deepEqual(store.getState().assignments, original);
});
