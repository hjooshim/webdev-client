import { createContext, useContext, useState, type ReactNode } from "react";
const CounterContext = createContext<{
  count: number;
  setCount: (count: number) => void;
} | null>(null);
export function CounterProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(7);
  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  );
}
export function useCounterContext() {
  const value = useContext(CounterContext);
  if (!value) throw new Error("CounterProvider required");
  return value;
}
