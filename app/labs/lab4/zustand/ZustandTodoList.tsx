import { useTodoStore } from "./todoStore";
import ZustandTodoForm from "./ZustandTodoForm";
import ZustandTodoItem from "./ZustandTodoItem";
export default function ZustandTodoList() {
  const todos = useTodoStore((state) => state.todos);
  return (
    <div id="wd-zustand-todo-list">
      <h3>Zustand Todo List</h3>
      <ZustandTodoForm />
      <ul>
        {todos.map((todo) => (
          <ZustandTodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
