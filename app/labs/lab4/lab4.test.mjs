import test from "node:test";
import assert from "node:assert/strict";
import { calculateSum } from "./url-encoding/calculate.ts";
import {
  emptyProfile,
  validateProfile,
  htmlToDate,
  dateToHtml,
} from "./profile/profile.ts";

test("URL addition handles decimals, negatives, omissions, and invalid values", () => {
  assert.equal(calculateSum(["2.5", "-4", "1.25"]), -0.25);
  assert.equal(calculateSum(["5", "10"]), 15);
  assert.equal(calculateSum(["5", null]), 5);
  assert.equal(calculateSum(["oops", "2"]), null);
});

test("profile validation and local date conversion", () => {
  assert.equal(Object.keys(validateProfile(emptyProfile)).length, 6);
  const valid = {
    ...emptyProfile,
    firstName: "Hyunjoo",
    lastName: "Shim",
    password: "abcdefgh",
    dob: htmlToDate("2000-02-29"),
    role: "STUDENT",
    topics: ["React"],
  };
  assert.deepEqual(validateProfile(valid), {});
  assert.equal(dateToHtml(valid.dob), "2000-02-29");
});
