import { todosService } from "../../services/todos";
import { ITodo, NewTodo } from "../../types";
import { TodosState } from "./types";
import { useErrorsStore } from "../index";
import { AxiosError } from "axios";

export const actions = {
  async getTodos(this: TodosState, token: string) {
    this.isLoading = true;
    const errorsStore = useErrorsStore();

    try {
      const todos = await todosService.getAll(token);

      this.todos = todos;
    } catch (error) {
      if (error instanceof AxiosError)
        errorsStore.setErrorMessage(error.response?.data.error);
      else if (error instanceof Error)
        errorsStore.setErrorMessage(error.message);
      else errorsStore.setErrorMessage("Something was wrong.");
    }

    this.isLoading = false;
  },
  async createTodo(this: TodosState, token: string, newTodo: NewTodo) {
    this.isLoading = true;
    const errorsStore = useErrorsStore();

    try {
      const addedTodo = await todosService.create(token, newTodo);

      this.todos = [...this.todos, addedTodo];
    } catch (error) {
      if (error instanceof AxiosError)
        errorsStore.setErrorMessage(error.response?.data.error);
      else if (error instanceof Error)
        errorsStore.setErrorMessage(error.message);
      else errorsStore.setErrorMessage("Something was wrong.");
    }

    this.isLoading = false;
  },
  async updateTodoState(this: TodosState, token: string, todo: ITodo) {
    this.isLoading = true;
    const errorsStore = useErrorsStore();

    try {
      const updatedTodo = await todosService.changeState(token, todo.id, todo);

      this.todos = this.todos.map((todo) => {
        if (todo.id === updatedTodo.id) return updatedTodo;
        return todo;
      });
    } catch (error) {
      if (error instanceof AxiosError)
        errorsStore.setErrorMessage(error.response?.data.error);
      else if (error instanceof Error)
        errorsStore.setErrorMessage(error.message);
      else errorsStore.setErrorMessage("Something was wrong.");
    }

    this.isLoading = false;
  },
  async removeTodo(this: TodosState, token: string, id: string) {
    this.isLoading = true;
    const errorsStore = useErrorsStore();

    try {
      await todosService.remove(token, id);

      this.todos = this.todos.filter((todo) => todo.id !== id);
    } catch (error) {
      if (error instanceof AxiosError)
        errorsStore.setErrorMessage(error.response?.data.error);
      else if (error instanceof Error)
        errorsStore.setErrorMessage(error.message);
      else errorsStore.setErrorMessage("Something was wrong.");
    }

    this.isLoading = false;
  },
};
