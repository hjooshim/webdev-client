import { isAxiosError } from "axios";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER?.replace(/\/$/, "");

export function httpError(error: unknown) {
  if (isAxiosError<{ error?: string }>(error)) {
    return error.response?.data?.error ?? "The server could not be reached. Please try again.";
  }
  return "The request could not be completed. Please try again.";
}

export function hasStatus(error: unknown, status: number) {
  return isAxiosError(error) && error.response?.status === status;
}
