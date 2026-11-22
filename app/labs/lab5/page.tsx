import type { ReactNode } from "react";
import { HTTP_SERVER } from "@/app/http";
import { ExpressCalculator, NextCalculator } from "./calculators";
import HelloRoute from "./HelloRoute";
import { LabLink } from "./LabLink";
import { AssignmentLinks, AsyncAssignment, ModuleLinks } from "./RemoteObjects";
import { AsyncTodos, TodoLinks } from "./RemoteTodos";

function Exercise({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3 rounded border border-neutral-300 p-4 [&_h4]:font-semibold">
      <h3 className="text-lg font-semibold">{title}</h3>
      {children}
    </section>
  );
}

export default function Lab5() {
  return (
    <div id="wd-lab5" className="space-y-4">
      <h2 className="text-2xl font-semibold">Lab 5</h2>
      <Exercise title="Environment Variables">
        <div id="wd-lab5-environment">
          <LabLink id="wd-welcome-link" path="/welcome">Welcome</LabLink>
          {!HTTP_SERVER && <p role="status">Set NEXT_PUBLIC_HTTP_SERVER to enable the Express exercises.</p>}
        </div>
      </Exercise>
      <Exercise title="Path Parameters"><ExpressCalculator mode="path" /></Exercise>
      <Exercise title="Query Parameters"><ExpressCalculator mode="query" /></Exercise>
      <Exercise title="Working with Remote Objects">
        <AssignmentLinks />
        <h4>Module Object (On Your Own)</h4>
        <ModuleLinks />
      </Exercise>
      <Exercise title="Working with Remote Arrays"><TodoLinks /></Exercise>
      <Exercise title="Asynchronous Communication with Axios"><AsyncAssignment /></Exercise>
      <Exercise title="JSON in the HTTP Body"><AsyncTodos /></Exercise>
      <Exercise title="Next.js Route Handlers">
        <h4>GET /api/lab5/hello</h4>
        <HelloRoute />
        <h4>Next.js Calculator Web API</h4>
        <NextCalculator />
      </Exercise>
    </div>
  );
}
