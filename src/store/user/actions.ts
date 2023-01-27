import { userService } from "../../services";
import { useErrorsStore } from "../errors";
import { UserState } from "./type";

export const actions = {
  async getUserInfo(this: UserState, token: string) {
    this.isLoading = true;
    const errorsStore = useErrorsStore();

    try {
      const user = await userService.getInfo(token);

      this.deletedTodos = user.deletedTodos;
    } catch (error) {
      if (error instanceof Error) errorsStore.setErrorMessage(error.message);
      errorsStore.setErrorMessage("Something was wrong.");
    }

    this.isLoading = false;
  },
};
