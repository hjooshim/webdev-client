import type { ReactNode } from "react";
import { HTTP_SERVER } from "@/app/http";

export const inputClass = "rounded border border-neutral-400 px-2 py-1";
export const buttonClass = "rounded bg-blue-700 px-3 py-1.5 text-white disabled:opacity-50";

export function LabLink({ id, path, children }: { id?: string; path?: string; children: ReactNode }) {
  return HTTP_SERVER && path ? (
    <a
      id={id}
      href={`${HTTP_SERVER}/lab5${path}`}
      target="_blank"
      rel="noreferrer"
      className="text-blue-700 underline"
    >
      {children}
    </a>
  ) : <span id={id} className="text-neutral-500">{children}</span>;
}
