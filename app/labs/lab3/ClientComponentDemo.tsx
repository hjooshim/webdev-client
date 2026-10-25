"use client";

import { usePathname } from "next/navigation";

export default function ClientComponentDemo() {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").filter(Boolean).at(-1) ?? "";
  return (
    <div id="wd-client-component-demo">
      <h2>Client Component Demo</h2>
      <p>Current pathname: {pathname}</p>
      <p>Pathname length: {pathname.length}</p>
      <p>Last segment: {lastSegment}</p>
    </div>
  );
}
