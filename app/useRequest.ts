"use client";

import { useRef, useState } from "react";
import { httpError } from "./http";

export function useRequest() {
  const running = useRef(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function run(action: () => Promise<void>) {
    if (running.current) return;
    running.current = true;
    setPending(true);
    setError("");
    try {
      await action();
    } catch (requestError) {
      setError(httpError(requestError));
    } finally {
      running.current = false;
      setPending(false);
    }
  }

  return { run, pending, error };
}
