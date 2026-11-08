import { FaPencil, FaTrash } from "react-icons/fa6";
import { useModulesStore } from "../../../store/modulesStore";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons({
  moduleId,
}: {
  moduleId: string;
}) {
  const { editModule, deleteModule } = useModulesStore();
  return (
    <div className="flex shrink-0 items-center gap-3">
      <button
        type="button"
        aria-label="Edit module"
        className="wd-edit-module text-neutral-700"
        onClick={() => editModule(moduleId)}
      >
        <FaPencil />
      </button>
      <button
        type="button"
        aria-label="Delete module"
        className="wd-delete-module text-red-600"
        onClick={() => deleteModule(moduleId)}
      >
        <FaTrash />
      </button>
      <GreenCheckmark />
    </div>
  );
}
