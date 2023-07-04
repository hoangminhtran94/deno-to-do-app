import { Router } from "https://deno.land/x/oak/mod.ts";
import { getTodos, addTodo } from "../controllers/todo_services.ts";
const router = new Router();

interface Todo {
  id: string;
  text: string;
}

let todos: Todo[] = [];

router.get("/todos", getTodos);

router.post("/todos", addTodo);

router.put("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId;
  const data = await ctx.request.body().value;
  const todoIndex = todos.findIndex((todo) => {
    return todo.id === tid;
  });
  todos[todoIndex] = { id: todos[todoIndex].id, text: data.text };
  ctx.response.body = { message: "Updated todo" };
});

router.delete("/todos/:todoId", (ctx) => {
  const tid = ctx.params.todoId;
  todos = todos.filter((todo) => todo.id !== tid);
  ctx.response.body = { message: "Deleted todo" };
});

export default router;
