import assert from "node:assert/strict";
import { test } from "node:test";

const client = new URL(process.env.A5_BASE_URL ?? "http://localhost:3000");
const server = new URL(process.env.NEXT_PUBLIC_HTTP_SERVER ?? "http://localhost:4000");

async function get(origin, path) {
  const response = await fetch(new URL(path, origin), { signal: AbortSignal.timeout(30_000) });
  assert.equal(response.status, 200, path);
  return response;
}

test("Lab 5 links to the configured Express service and serves its Next.js examples", async () => {
  const html = await (await get(client, "/labs/lab5")).text();
  assert.ok([...html.matchAll(/<h[1-6]\b/g)].length >= 15);
  assert.ok(html.includes(`href="${new URL("/lab5/welcome", server)}"`));
  assert.match(await (await get(server, "/lab5/welcome")).text(), /Welcome/);

  const hello = await (await get(client, "/api/lab5/hello")).json();
  assert.equal(typeof hello.message, "string");
  const calculation = await (
    await get(client, "/api/lab5/calculator?operation=add&a=12&b=30")
  ).json();
  assert.equal(calculation.result, 42);
});

test("Dashboard and Modules can read Express data through the client proxy", async () => {
  const courses = await (await get(client, "/kambaz-api/courses")).json();
  assert.ok(courses.length >= 3);
  assert.ok(courses.every(({ _id, name }) => _id && name));

  const modules = await Promise.all(courses.slice(0, 2).map(async ({ _id }) => {
    const path = `/kambaz-api/courses/${encodeURIComponent(_id)}/modules`;
    const rows = await (await get(client, path)).json();
    assert.ok(rows.length > 0);
    assert.ok(rows.every((row) => row.course === _id));
    return rows;
  }));
  assert.notDeepEqual(modules[0], modules[1]);
});
