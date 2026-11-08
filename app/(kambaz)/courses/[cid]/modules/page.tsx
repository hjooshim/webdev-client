"use client";

import { useParams } from "next/navigation";
import { useModulesStore } from "../../../store/modulesStore";
import Module from "./Module";
import ModulesControls from "./ModulesControls";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const allModules = useModulesStore((state) => state.modules);
  const modules = allModules.filter((module) => module.course === cid);
  return (
    <div>
      <ModulesControls />
      <ul id="wd-modules" className="m-0 list-none p-0">
        {modules.map((module) => (
          <Module key={module._id} module={module} />
        ))}
      </ul>
    </div>
  );
}
