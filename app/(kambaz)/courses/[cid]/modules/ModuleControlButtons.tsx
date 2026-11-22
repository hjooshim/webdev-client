import { useRequest } from "@/app/useRequest";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { useAccountContext } from "../../../account/AccountContext";
import { useModulesStore } from "../../../store/modulesStore";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons({
  moduleId,
}: {
  moduleId: string;
}) {
  const { editModule, deleteModule } = useModulesStore();
  const { run, pending, error } = useRequest();
  const { currentUser } = useAccountContext();
  if (!currentUser) return <GreenCheckmark />;
  return (
    <div className="flex shrink-0 items-center gap-3">
      <button
        type="button"
        aria-label="Edit module"
        className="wd-edit-module text-neutral-700"
        onClick={() => editModule(moduleId, true)}
      >
        <FaPencil />
      </button>
      <button
        type="button"
        aria-label="Delete module"
        className="wd-delete-module text-red-600"
        disabled={pending}
        onClick={() => void run(() => deleteModule(moduleId))}
      >
        <FaTrash />
      </button>
      <GreenCheckmark />
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
    </div>
  );
}
