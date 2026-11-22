"use client";

import { useEffect, useState, type FormEvent } from "react";
import { FaPlusCircle, FaTimes } from "react-icons/fa";
import { HTTP_SERVER, httpError } from "@/app/http";
import { useRequest } from "@/app/useRequest";
import { addTodo, deleteTodo, fetchTodos, updateTodo, type Todo } from "./client";
import { buttonClass, inputClass, LabLink } from "./LabLink";

const initialTodo = { id: 1, title: "Learn HTTP", description: "Practice the todo routes.", completed: false };

function TodoFields({
  draft, onChange,
}: {
  draft: Omit<Todo, "id">;
  onChange: (draft: Omit<Todo, "id">) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <label>Title <input required value={draft.title} onChange={(event) => onChange({ ...draft, title: event.target.value })} className={inputClass} /></label>
      <label>Description <input value={draft.description} onChange={(event) => onChange({ ...draft, description: event.target.value })} className={inputClass} /></label>
      <label><input type="checkbox" checked={draft.completed} onChange={(event) => onChange({ ...draft, completed: event.target.checked })} /> Completed</label>
    </div>
  );
}

export function TodoLinks() {
  const [id, setId] = useState("1");
  const [draft, setDraft] = useState(initialTodo);
  const todoPath = id ? `/todos/${encodeURIComponent(id)}` : undefined;
  return (
    <div className="space-y-3">
      <h4>Retrieving Todos and Filtering by Completion</h4>
      <div className="flex flex-wrap items-center gap-3">
        <LabLink id="wd-retrieve-todos" path="/todos">Get Todos</LabLink>
        <LabLink id="wd-retrieve-completed-todos" path="/todos?completed=true">Get Completed Todos</LabLink>
        <label>Todo ID <input id="wd-todo-id" type="number" min="1" value={id} onChange={(event) => setId(event.target.value)} className={inputClass} /></label>
        <LabLink id="wd-retrieve-todo-by-id" path={todoPath}>Get Todo by ID</LabLink>
      </div>
      <h4>Creating and Removing Todos with GET</h4>
      <div className="flex flex-wrap gap-3">
        <LabLink id="wd-create-todo" path="/todos/create">Create Todo</LabLink>
        <LabLink id="wd-remove-todo" path={todoPath && `${todoPath}/delete`}>Remove Todo by ID</LabLink>
      </div>
      <h4>Updating Todo Fields</h4>
      <TodoFields draft={draft} onChange={(fields) => setDraft({ ...draft, ...fields })} />
      <div className="flex flex-wrap gap-3">
        <LabLink id="wd-update-todo-title" path={todoPath && draft.title.trim() ? `${todoPath}/title/${encodeURIComponent(draft.title)}` : undefined}>Update Todo</LabLink>
        <LabLink id="wd-update-todo-description" path={todoPath && draft.description.trim() ? `${todoPath}/description/${encodeURIComponent(draft.description)}` : undefined}>Describe Todo</LabLink>
        <LabLink id="wd-update-todo-completed" path={todoPath && `${todoPath}/completed/${draft.completed}`}>Update Todo Completion</LabLink>
      </div>
    </div>
  );
}

const blankDraft = { title: "", description: "", completed: false };

export function AsyncTodos() {
  const [todos, setTodos] = useState<Todo[]>();
  const [draft, setDraft] = useState(blankDraft);
  const [editingId, setEditingId] = useState<number>();
  const [loadError, setLoadError] = useState("");
  const { run, pending, error } = useRequest();

  useEffect(() => {
    if (!HTTP_SERVER) return;
    const controller = new AbortController();
    fetchTodos(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setTodos(data);
      })
      .catch((requestError) => {
        if (!controller.signal.aborted) setLoadError(httpError(requestError));
      });
    return () => controller.abort();
  }, []);

  const reset = () => {
    setDraft(blankDraft);
    setEditingId(undefined);
  };

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.title.trim()) return;
    void run(async () => {
      if (editingId === undefined) {
        const created = await addTodo(draft);
        setTodos((rows) => [...(rows ?? []), created]);
      } else {
        const updated = await updateTodo({ ...draft, id: editingId });
        setTodos((rows) => rows?.map((row) => row.id === updated.id ? updated : row));
      }
      reset();
    });
  };

  const remove = (id: number) => void run(async () => {
    await deleteTodo(id);
    setTodos((rows) => rows?.filter((row) => row.id !== id));
    if (editingId === id) reset();
  });

  return (
    <div className="space-y-3">
      <h4>{editingId === undefined ? "Creating Todos with POST" : "Editing a Todo with PUT"}</h4>
      <form onSubmit={save} className="space-y-2">
        <TodoFields draft={draft} onChange={setDraft} />
        <div className="flex flex-wrap gap-2">
          <button type="submit" disabled={!todos || pending} className={buttonClass}>
            {editingId === undefined ? <><FaPlusCircle className="inline" /> Add Todo</> : "Save Todo"}
          </button>
          {editingId !== undefined && <button type="button" onClick={reset} disabled={pending} className={inputClass}>Cancel</button>}
        </div>
      </form>
      <h4>Updating and Deleting Todos with PUT and DELETE</h4>
      {(loadError || error) && <p id="wd-todo-error-message" role="alert" className="rounded bg-red-100 p-2 text-red-800">{loadError || error}</p>}
      {!todos && HTTP_SERVER && !loadError && <p role="status">Loading todos…</p>}
      {todos?.length === 0 && <p>No todos.</p>}
      <ul className="space-y-2">
        {todos?.map((todo) => (
          <li key={todo.id} className="flex flex-wrap items-center gap-2 border-b pb-2">
            <span>
              {todo.id}. <span className={todo.completed ? "line-through" : undefined}>{todo.title}</span>
              {todo.completed && " (completed)"}{todo.description && ` · ${todo.description}`}
            </span>
            <button type="button" disabled={pending} onClick={() => {
              setDraft({ title: todo.title, description: todo.description, completed: todo.completed });
              setEditingId(todo.id);
            }} className={inputClass}>Edit</button>
            <button type="button" disabled={pending} onClick={() => remove(todo.id)} aria-label={`Delete ${todo.title}`} className="rounded p-2 text-red-700">
              <FaTimes />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
