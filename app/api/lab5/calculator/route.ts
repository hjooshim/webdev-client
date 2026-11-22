import type { NextRequest } from "next/server";
import { calculate } from "./calculate";

export function GET({ nextUrl }: NextRequest) {
  const query = nextUrl.searchParams;
  const result = calculate(query.get("operation"), query.get("a"), query.get("b"));
  return Response.json(result, { status: result.error ? 400 : 200 });
}
