"use client";

import { useState, type FormEvent } from "react";
import { useRequest } from "@/app/useRequest";
import { calculateOnNext } from "./client";
import { buttonClass, inputClass, LabLink } from "./LabLink";

const operations = [
  { name: "add", label: "Add", symbol: "+" },
  { name: "subtract", label: "Subtract", symbol: "−" },
  { name: "multiply", label: "Multiply", symbol: "×" },
  { name: "divide", label: "Divide", symbol: "÷" },
] as const;

function Operands({
  a, b, setA, setB,
}: {
  a: string;
  b: string;
  setA: (value: string) => void;
  setB: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <label>First number <input type="number" step="any" required value={a} onChange={(event) => setA(event.target.value)} className={inputClass} /></label>
      <label>Second number <input type="number" step="any" required value={b} onChange={(event) => setB(event.target.value)} className={inputClass} /></label>
    </div>
  );
}

export function ExpressCalculator({ mode }: { mode: "path" | "query" }) {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");

  return (
    <div className="space-y-2">
      <Operands a={a} b={b} setA={setA} setB={setB} />
      <div className="flex flex-wrap gap-3">
        {operations.map(({ name, label, symbol }) => {
          const params = new URLSearchParams({ operation: name, a, b });
          const path = mode === "path"
            ? `/${name}/${encodeURIComponent(a)}/${encodeURIComponent(b)}`
            : `/calculator?${params}`;
          return (
            <LabLink key={name} id={`wd-${mode}-parameter-${name}`} path={a && b ? path : undefined}>
              {label} {a} {symbol} {b}
            </LabLink>
          );
        })}
      </div>
    </div>
  );
}

export function NextCalculator() {
  const [a, setA] = useState("3");
  const [b, setB] = useState("5");
  const [operation, setOperation] = useState("add");
  const [formula, setFormula] = useState("");
  const { run, pending, error } = useRequest();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormula("");
    void run(async () => {
      const data = await calculateOnNext(a, b, operation);
      const symbol = operations.find((item) => item.name === data.operation)?.symbol;
      setFormula(`${data.a} ${symbol} ${data.b} = ${data.result}`);
    });
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <Operands a={a} b={b} setA={setA} setB={setB} />
      <div className="flex flex-wrap gap-2">
        <label>
          Operation{" "}
          <select value={operation} onChange={(event) => setOperation(event.target.value)} className={inputClass}>
            {operations.map(({ name, label }) => <option key={name} value={name}>{label}</option>)}
          </select>
        </label>
        <button type="submit" disabled={pending} className={buttonClass}>Calculate</button>
      </div>
      {formula && <output className="block">{formula}</output>}
      {error && <p role="alert" className="text-red-700">{error}</p>}
    </form>
  );
}
