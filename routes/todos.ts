import { Router } from "https://deno.land/x/oak/mod.ts";
import TodoEntity from "../entities/TodoEntity.ts";
import { v4 } from "npm:uuid";
const router = new Router();

interface Todo {
  id: string;
  text: string;
}

let todos: Todo[] = [];

router.get("/todos", async (ctx) => {
  const toDos = await TodoEntity.find();
  ctx.response.body = { todos: toDos };
});

router.post("/todos", async (ctx) => {
  const data = await ctx.request.body().value;
  const newTodo = new TodoEntity({ id: v4(), text: data.text });

  const response = await newTodo.save();

  ctx.response.body = { message: "Created todo!", todo: response };
});

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
