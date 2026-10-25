function lengthOf(value: unknown): number {
  if (typeof value === "string") return value.length;
  if (Array.isArray(value)) return value.length;
  return 0;
}

function upperCaseString(value: unknown): string {
  return typeof value === "string" ? value.toUpperCase() : "not a string";
}

export default function AnyVsUnknown() {
  const anything: unknown = "hello";
  const parsed: unknown = JSON.parse('{"name": "Alice"}');
  const name =
    typeof parsed === "object" && parsed !== null && "name" in parsed
      ? String(parsed.name)
      : "unknown";
  return (
    <div id="wd-any-vs-unknown">
      <h4>any vs unknown</h4>
      any disables checks; unknown requires narrowing. <br />
      upperCaseString(anything) = {upperCaseString(anything)} <br />
      lengthOf(&quot;hello&quot;) = {lengthOf("hello")} <br />
      lengthOf([1, 2, 3]) = {lengthOf([1, 2, 3])} <br />
      lengthOf(42) = {lengthOf(42)} <br />
      parsed name = {name}
      <hr />
    </div>
  );
}
