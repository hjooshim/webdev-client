import { useState } from "react";
import { useTodosContext } from "./todosContext";
import ContextTodoForm from "./ContextTodoForm";
import ContextTodoItem from "./ContextTodoItem";
export default function ReactContextTodoList() {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodosContext();
  const [editing, setEditing] = useState<string | null>(null);
  const [title, setTitle] = useState("Learn React");
  const save = () => {
    if (!title.trim()) return;
    if (editing && todos.some((item) => item.id === editing))
      updateTodo({ id: editing, title });
    else addTodo(title);
    setTitle("");
    setEditing(null);
  };
  return (
    <div id="wd-context-todo-list">
      <h3>React Context Todo List</h3>
      <ContextTodoForm
        editing={editing}
        title={title}
        setTitle={setTitle}
        save={save}
      />
      <ul>
        {todos.map((todo) => (
          <ContextTodoItem
            key={todo.id}
            todo={todo}
            edit={(item) => {
              setEditing(item.id);
              setTitle(item.title);
            }}
            remove={(id) => {
              deleteTodo(id);
              if (editing === id) {
                setEditing(null);
                setTitle("");
              }
            }}
          />
        ))}
      </ul>
    </div>
  );
}
