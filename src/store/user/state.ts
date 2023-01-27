import { UserState } from "../todos/types";

export const state: () => UserState = () => ({
  deletedTodos: 0,
  isLoading: false,
});
