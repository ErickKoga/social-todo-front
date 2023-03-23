import { ENDPOINTS } from "@/helpers/constants";
import { IUser } from "@/types/user.types";
import { IUpdateUser } from "../types/user.types";

export async function getAllUsers(): Promise<IUser[]> {
  const response = await fetch(`${ENDPOINTS.USER}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
}

export async function getUsers(id: string): Promise<IUser> {
  const response = await fetch(`${ENDPOINTS.USER}/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
}

export async function updateUsers(
  id: string,
  usersData: IUpdateUser
): Promise<IUser> {
  const response = await fetch(`${ENDPOINTS.USER}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usersData),
  });
  const data = await response.json();
  return data;
}

export async function deleteUsers(id: string): Promise<IUser> {
  const response = await fetch(`${ENDPOINTS.USER}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
}
