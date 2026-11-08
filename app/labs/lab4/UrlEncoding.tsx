"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function UrlEncoding() {
  const [a, setA] = useState("5");
  const [b, setB] = useState("10");
  const [c, setC] = useState("2");
  const router = useRouter();
  const base = "/labs/lab4/url-encoding";
  const query = (three: boolean) => {
    const params = new URLSearchParams({ a, b });
    if (three) params.set("c", c);
    return `${base}/query-params?${params}`;
  };
  const path = (three: boolean) =>
    `${base}/path-params/${encodeURIComponent(a)}/${encodeURIComponent(b)}${three ? `/${encodeURIComponent(c)}` : ""}`;
  return (
    <section
      className="rounded border border-neutral-200 bg-white p-4 shadow-sm"
      id="wd-url-encoding"
    >
      <h2>Addition Calculator</h2>
      <p>Enter numbers, then use a button or link.</p>
      <input
        className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
        id="wd-url-a"
        type="number"
        step="any"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      <input
        className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
        id="wd-url-b"
        type="number"
        step="any"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />
      <label>
        My third number
        <input
          className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
          id="wd-url-personal-c"
          type="number"
          step="any"
          value={c}
          onChange={(e) => setC(e.target.value)}
        />
      </label>
      <label>
        Sample third number
        <input
          className="rounded border border-neutral-300 px-3 py-1.5 me-2 mb-2"
          id="wd-url-c"
          type="number"
          step="any"
          value={c}
          onChange={(e) => setC(e.target.value)}
        />
      </label>
      <h4>Programmatic navigation</h4>
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-url-query-programmatic"
        onClick={() => router.push(query(false))}
      >
        Query a + b
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-url-path-programmatic"
        onClick={() => router.push(path(false))}
      >
        Path a + b
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-url-query-three-programmatic"
        onClick={() => router.push(query(true))}
      >
        Query a + b + c
      </button>{" "}
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white me-2 mb-2"
        id="wd-url-path-three-programmatic"
        onClick={() => router.push(path(true))}
      >
        Path a + b + c
      </button>
      <h4>Declarative navigation</h4>
      <Link id="wd-url-query-link" href={query(false)}>
        Query a + b
      </Link>{" "}
      <Link id="wd-url-path-link" href={path(false)}>
        Path a + b
      </Link>{" "}
      <Link id="wd-url-query-three-link" href={query(true)}>
        Query a + b + c
      </Link>{" "}
      <Link id="wd-url-path-three-link" href={path(true)}>
        Path a + b + c
      </Link>
    </section>
  );
}
