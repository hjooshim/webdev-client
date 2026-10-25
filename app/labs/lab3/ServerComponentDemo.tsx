import "server-only";
import fs from "node:fs";
import path from "node:path";

export default function ServerComponentDemo() {
  const platform = process.platform;
  const nodeVersion = process.version;
  const serverRenderTime = new Date().toLocaleTimeString();
  const lab3Dir = path.join(process.cwd(), "app/labs/lab3");
  let files: string[] = [];
  let filesystemMessage = "";
  try {
    files = fs.readdirSync(lab3Dir);
  } catch (error) {
    filesystemMessage =
      error instanceof Error ? `Could not read the Lab 3 folder: ${error.message}` : "Could not read the Lab 3 folder.";
  }
  return (
    <div id="wd-server-component-demo">
      <h2>Server Component Demo</h2>
      <h3>Server Render Time</h3>
      <p>Rendered on server at: {serverRenderTime}</p>
      <h3>Server Information</h3>
      <pre>
        {JSON.stringify(
          { platform, arch: process.arch, nodeVersion, pid: process.pid, serverRenderTime },
          null,
          2,
        )}
      </pre>
      <h3>Filesystem Access Demo</h3>
      {filesystemMessage && <p>{filesystemMessage}</p>}
      <pre>{JSON.stringify(files, null, 2)}</pre>
    </div>
  );
}
