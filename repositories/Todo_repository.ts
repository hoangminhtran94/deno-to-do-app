import TodoEntity from "../entities/Todo_entity.ts";
import { v4 } from "npm:uuid";
import { AddTodoDTO } from "../Dto/add_Todo.ts";
export const queryAllTodos = async () => {
  return await TodoEntity.find();
};

export const addNewToDoMutation = async (addTodoDTO: AddTodoDTO) => {
  const newTodo = new TodoEntity({ id: v4(), text: addTodoDTO.text });
  const response = await newTodo.save();
  return response;
};
