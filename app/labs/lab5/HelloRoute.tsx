"use client";

import { useEffect, useState } from "react";
import { httpError } from "@/app/http";
import { fetchHello } from "./client";

export default function HelloRoute() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    fetchHello(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setMessage(data.message);
      })
      .catch((requestError) => {
        if (!controller.signal.aborted) setError(httpError(requestError));
      });
    return () => controller.abort();
  }, []);
  return error ? <p role="alert" className="text-red-700">{error}</p> : <p role="status">{message || "Loading greeting…"}</p>;
}
