import { Context } from "https://deno.land/x/oak/mod.ts";
import TodoEntity from "../entities/Todo_entity.ts";
import {
  queryAllTodos,
  addNewToDoMutation,
} from "../repositories/Todo_repository.ts";
import { v4 } from "npm:uuid";
import { AddTodoDTO } from "../Dto/add_Todo.ts";
export const getTodos = async (ctx: Context) => {
  const todos = await queryAllTodos();
  ctx.response.body = { todos: todos };
};

export const addTodo = async (ctx: Context) => {
  const data = await ctx.request.body().value;

  const newTodo = await addNewToDoMutation(new AddTodoDTO(data.text));
  ctx.response.body = { message: "Created todo!", todo: newTodo };
};
