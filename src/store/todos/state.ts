import { TodosState } from "./types";

export const state: () => TodosState = () => ({
  todos: [],
  isLoading: false,
});
