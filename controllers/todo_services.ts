import { Context } from "https://deno.land/x/oak/mod.ts";
import {
  queryAllTodos,
  addNewToDoMutation,
} from "../repositories/Todo_repository.ts";
import { AddTodoDTO } from "../Dto/add_Todo.ts";
export const getTodos = async (ctx: Context) => {
  const todos = await queryAllTodos();
  ctx.response.body = { todos: todos };
};

export const addTodo = async (ctx: Context) => {
  const data = await ctx.request.body().value;
  const addTodoDTO = new AddTodoDTO(data.text);
  const newTodo = await addNewToDoMutation(addTodoDTO);
  ctx.response.body = { message: "Created todo!", todo: newTodo };
};
