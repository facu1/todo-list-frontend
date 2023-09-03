import axios from "axios";
import { ITodo, NewTodo } from "../types";

const baseUrl = `${import.meta.env.VITE_API_URL}/api/todos`;

const generateConfig = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

const getAll = async (token: string) => {
  const { data } = await axios.get<ITodo[]>(baseUrl, generateConfig(token));

  return data;
};

const create = async (token: string, newTodo: NewTodo) => {
  const { data } = await axios.post<ITodo>(
    baseUrl,
    newTodo,
    generateConfig(token)
  );

  return data;
};

const changeState = async (token: string, id: string, todo: unknown) => {
  const { data } = await axios.put(
    `${baseUrl}/${id}`,
    todo,
    generateConfig(token)
  );

  return data;
};

const remove = async (token: string, id: string) => {
  const { data } = await axios.delete(
    `${baseUrl}/${id}`,
    generateConfig(token)
  );

  return data;
};

export const todosService = { getAll, create, changeState, remove };
