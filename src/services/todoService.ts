import { ENDPOINTS } from "@/helpers/constants";
import { ICreateTodo, ITodo } from "@/types/todo.types";
import { IUpdateTodo } from "../types/todo.types";

export async function createTodo(todoData: ICreateTodo): Promise<ITodo> {
  const response = await fetch(`${ENDPOINTS.TODO}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todoData),
  });
  const data = await response.json();
  return data;
}

export async function getAllTodo(): Promise<ITodo[]> {
  const response = await fetch(`${ENDPOINTS.TODO}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
}

export async function getTodo(id: string): Promise<ITodo> {
  const response = await fetch(`${ENDPOINTS.TODO}/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
}

export async function updateTodo(
  id: string,
  todoData: IUpdateTodo
): Promise<ITodo> {
  const response = await fetch(`${ENDPOINTS.TODO}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todoData),
  });
  const data = await response.json();
  return data;
}

export async function deleteTodo(id: string): Promise<ITodo> {
  const response = await fetch(`${ENDPOINTS.TODO}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
}
