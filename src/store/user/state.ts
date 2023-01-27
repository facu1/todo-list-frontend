import { UserState } from "./type";

export const state: () => UserState = () => ({
  deletedTodos: 0,
  isLoading: false,
});
