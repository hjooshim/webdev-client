import axios from "axios";
import type { Assignment, Course, Enrollment, Module, User } from "./store/types";

const api = axios.create({ baseURL: "/kambaz-api", timeout: 30_000 });
const coursePath = (id: string) => `/courses/${encodeURIComponent(id)}`;
const userPath = (id: string) => `/users/${encodeURIComponent(id)}`;

export async function findCourses(signal?: AbortSignal) {
  return (await api.get<Course[]>("/courses", { signal })).data;
}

export async function findMyCourses(signal?: AbortSignal) {
  return (await api.get<Course[]>("/users/current/courses", { signal })).data;
}

export async function findCourse(id: string, signal?: AbortSignal) {
  return (await api.get<Course>(coursePath(id), { signal })).data;
}

export async function createCourse(course: Course) {
  return (await api.post<Course>("/users/current/courses", course)).data;
}

export async function updateCourse(course: Course) {
  return (await api.put<Course>(coursePath(course._id), course)).data;
}

export async function deleteCourse(id: string) {
  await api.delete(coursePath(id));
}

export async function findModules(cid: string, signal?: AbortSignal) {
  return (await api.get<Module[]>(`${coursePath(cid)}/modules`, { signal })).data;
}

export async function createModule({ course, name }: Pick<Module, "course" | "name">) {
  return (await api.post<Module>(`${coursePath(course)}/modules`, { name })).data;
}

export async function updateModule({ _id, name, description }: Module) {
  return (await api.put<Module>(`/modules/${encodeURIComponent(_id)}`, { name, description })).data;
}

export async function deleteModule(id: string) {
  await api.delete(`/modules/${encodeURIComponent(id)}`);
}

export async function findAssignments(cid: string, signal?: AbortSignal) {
  return (await api.get<Assignment[]>(`${coursePath(cid)}/assignments`, { signal })).data;
}

export async function createAssignment(assignment: Assignment) {
  return (await api.post<Assignment>(`${coursePath(assignment.course)}/assignments`, assignment)).data;
}

export async function updateAssignment(assignment: Assignment) {
  return (await api.put<Assignment>(`/assignments/${encodeURIComponent(assignment._id)}`, assignment)).data;
}

export async function deleteAssignment(id: string) {
  await api.delete(`/assignments/${encodeURIComponent(id)}`);
}

export async function getEnrollments(signal?: AbortSignal) {
  return (await api.get<Enrollment[]>("/users/current/enrollments", { signal })).data;
}

export async function enrollInCourse(userId: string, courseId: string) {
  return (await api.post<Enrollment>(`${userPath(userId)}${coursePath(courseId)}`)).data;
}

export async function unenrollFromCourse(userId: string, courseId: string) {
  await api.delete(`${userPath(userId)}${coursePath(courseId)}`);
}

export async function findPeople(cid: string, signal?: AbortSignal) {
  return (await api.get<User[]>(`${coursePath(cid)}/users`, { signal })).data;
}

export async function addPerson(cid: string, user: User & { password: string }) {
  return (await api.post<User>(`${coursePath(cid)}/users`, user)).data;
}

export async function updateUser(user: User & { password?: string }) {
  return (await api.put<User>(userPath(user._id), user)).data;
}

type Credentials = { username: string; password: string };

export async function signup(credentials: Credentials) {
  return (await api.post<User>("/users/signup", credentials)).data;
}

export async function signin(credentials: Credentials) {
  return (await api.post<User>("/users/signin", credentials)).data;
}

export async function profile(signal?: AbortSignal) {
  return (await api.get<User>("/users/profile", { signal })).data;
}

export async function signout() {
  await api.post("/users/signout");
}
