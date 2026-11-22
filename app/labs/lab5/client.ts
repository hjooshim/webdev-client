import axios from "axios";
import { HTTP_SERVER } from "@/app/http";

export type Assignment = { id: string; title: string; score: number; completed: boolean };
export type Todo = { id: number; title: string; description: string; completed: boolean };
type TodoDraft = Omit<Todo, "id">;

const api = axios.create({ timeout: 30_000 });

function labURL(path: string) {
  if (!HTTP_SERVER) throw new Error("NEXT_PUBLIC_HTTP_SERVER is required.");
  return `${HTTP_SERVER}/lab5${path}`;
}

export async function fetchAssignment(signal?: AbortSignal) {
  return (await api.get<Assignment>(labURL("/assignment"), { signal })).data;
}

export async function updateAssignmentTitle(title: string) {
  return (await api.get<Assignment>(labURL(`/assignment/title/${encodeURIComponent(title)}`))).data;
}

export async function fetchTodos(signal?: AbortSignal) {
  return (await api.get<Todo[]>(labURL("/todos"), { signal })).data;
}

export async function addTodo(todo: TodoDraft) {
  return (await api.post<Todo>(labURL("/todos"), todo)).data;
}

export async function updateTodo({ id, ...todo }: Todo) {
  return (await api.put<Todo>(labURL(`/todos/${id}`), todo)).data;
}

export async function deleteTodo(id: number) {
  await api.delete(labURL(`/todos/${id}`));
}

export async function fetchHello(signal?: AbortSignal) {
  return (await api.get<{ message: string }>("/api/lab5/hello", { signal })).data;
}

export async function calculateOnNext(a: string, b: string, operation: string) {
  return (await api.get<{ a: number; b: number; operation: string; result: number }>(
    "/api/lab5/calculator", { params: { a, b, operation } },
  )).data;
}
