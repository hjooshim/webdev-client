import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, updateTodo } from "./todosReducer";
import type { RootState } from "./store";
import ReduxTodoForm from "./ReduxTodoForm";
import ReduxTodoItem from "./ReduxTodoItem";
export default function ReduxTodos() {
  const todos = useSelector((state: RootState) => state.todosReducer.todos);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("Learn Mongo");
  const [editingId, setEditingId] = useState<string | null>(null);
  const save = () => {
    if (!title.trim()) return;
    if (editingId && todos.some((item) => item.id === editingId))
      dispatch(updateTodo({ id: editingId, title }));
    else dispatch(addTodo(title));
    setEditingId(null);
    setTitle("");
  };
  return (
    <div id="wd-redux-todos">
      <h3>Redux Todo List</h3>
      <ReduxTodoForm
        title={title}
        setTitle={setTitle}
        editing={Boolean(editingId)}
        save={save}
      />
      <ul>
        {todos.map((todo) => (
          <ReduxTodoItem
            key={todo.id}
            todo={todo}
            edit={(item) => {
              setEditingId(item.id);
              setTitle(item.title);
            }}
            remove={(id) => {
              dispatch(deleteTodo(id));
              if (editingId === id) {
                setEditingId(null);
                setTitle("");
              }
            }}
          />
        ))}
      </ul>
    </div>
  );
}
