import { ITodo } from "../../types";

export interface TodosState {
  todos: ITodo[];
  isLoading: boolean;
}
