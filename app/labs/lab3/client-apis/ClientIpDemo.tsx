"use client";

import { useEffect, useState } from "react";

function readIp(value: unknown): string | null {
  if (typeof value !== "object" || value === null || !("ip" in value)) return null;
  return typeof value.ip === "string" ? value.ip : null;
}

export default function ClientIpDemo() {
  const [ip, setIp] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch("https://api.ipify.org?format=json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data: unknown) => {
        const value = readIp(data);
        if (value === null) throw new Error("The response did not include an IP address.");
        setIp(value);
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "unknown error");
      });
    return () => controller.abort();
  }, []);
  return (
    <div id="wd-client-ip-demo">
      <h3>Public IP address</h3>
      {error ? <p>Could not look up your IP: {error}</p> : <p>Your public IP: {ip ?? "Looking up..."}</p>}
    </div>
  );
}
