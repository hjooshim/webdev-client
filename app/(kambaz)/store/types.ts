import courses from "../database/courses.json";
import modules from "../database/modules.json";
import users from "../database/users.json";

export type Course = (typeof courses)[number];
export type Module = (typeof modules)[number] & { editing?: boolean };
export type User = (typeof users)[number] & { dob?: string };
