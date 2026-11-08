import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import { isValidUsername } from "../app/(kambaz)/account/signup/username.ts";
import { useTodoStore } from "../app/labs/lab4/zustand/todoStore.ts";

test("signup pattern accepts ordinary names and rejects blank names", () => {
  const source = readFileSync("app/(kambaz)/account/signup/page.tsx", "utf8");
  const tree = ts.createSourceFile("signup.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let pattern;
  const visit = (node) => {
    if (ts.isJsxAttribute(node) && node.name.text === "pattern") {
      pattern = node.initializer.text;
    }
    ts.forEachChild(node, visit);
  };
  visit(tree);
  assert.ok(pattern);
  const inputPattern = new RegExp(`^(?:${pattern})$`, "v");
  assert.equal(inputPattern.test("new_student"), true);
  assert.equal(inputPattern.test("   "), false);
  assert.equal(isValidUsername(" new_student "), true);
  assert.equal(isValidUsername("   "), false);
});

test("Zustand title save preserves completion toggled during edit", () => {
  const store = useTodoStore;
  const selected = store.getState().todos.find((todo) => todo.id === "3");
  store.getState().setTodo(selected);
  store.getState().toggleDone("3");
  store.getState().updateTodo({ ...store.getState().todo, title: "Edited JavaScript" });
  const saved = store.getState().todos.find((todo) => todo.id === "3");
  assert.equal(saved.title, "Edited JavaScript");
  assert.equal(saved.done, true);
});

test("Zustand deletion clears a selected draft and allows the next add", () => {
  const store = useTodoStore;
  const selected = store.getState().todos.find((todo) => todo.id === "2");
  store.getState().setTodo(selected);
  store.getState().deleteTodo("2");
  assert.equal(store.getState().todo.id, "-1");
  store.getState().addTodo({ ...store.getState().todo, title: "New after deletion" });
  assert.ok(store.getState().todos.some((todo) => todo.title === "New after deletion"));
});
